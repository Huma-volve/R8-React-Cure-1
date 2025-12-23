const http = require('http');
const https = require('https');
const url = require('url');

const TARGET_HOST = 'round8-cure-php-team-two.huma-volve.com';
const LOCAL_PORT = 8000;
const FRONTEND_URL = 'http://localhost:5173';

console.log('---------------------------------------------------');
console.log('🚀 Upgraded Google Auth Proxy (JSON -> Redirect)');
console.log(`📡 Listening on: http://127.0.0.1:${LOCAL_PORT}`);
console.log(`🎯 Forwarding to: https://${TARGET_HOST}`);
console.log('---------------------------------------------------');

const server = http.createServer((clientReq, clientRes) => {
    const parsedUrl = url.parse(clientReq.url);
    console.log(`[${new Date().toLocaleTimeString()}] ${clientReq.method} ${parsedUrl.pathname}`);

    const options = {
        hostname: TARGET_HOST,
        port: 443,
        path: clientReq.url,
        method: clientReq.method,
        headers: {
            ...clientReq.headers,
            'host': TARGET_HOST,
            'connection': 'keep-alive',
            // Force identity encoding so we don't get compressed (garbled) data
            'accept-encoding': 'identity'
        },
        rejectUnauthorized: false
    };

    const proxyReq = https.request(options, (proxyRes) => {
        const isCallback = parsedUrl.pathname.includes('/auth/google/callback');
        const contentType = proxyRes.headers['content-type'] || '';
        const contentEncoding = proxyRes.headers['content-encoding'] || 'identity';
        const isJson = contentType.includes('application/json');

        console.log(`  <-- Backend Response: ${proxyRes.statusCode} (${contentType}, Encoding: ${contentEncoding})`);

        if (isCallback && isJson) {
            console.log('  🔍 Callback JSON detected, reading body...');
            let body = '';
            proxyRes.on('data', (chunk) => { body += chunk; });
            proxyRes.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (data.status && data.data && data.data.token) {
                        const token = data.data.token;
                        const tokenType = data.data.token_type || 'Bearer';
                        const userData = data.data.data;

                        const redirectUrl = `${FRONTEND_URL}/profile?token=${encodeURIComponent(token)}&token_type=${encodeURIComponent(tokenType)}&user=${encodeURIComponent(JSON.stringify(userData))}`;

                        console.log('  ✅ LOGIN SUCCESS! Redirecting to frontend...');
                        clientRes.writeHead(302, { 'Location': redirectUrl });
                        clientRes.end();
                        return;
                    } else {
                        console.log('  ⚠️ JSON received but no token found structure.');
                        console.log('  Body received:', body);
                    }
                } catch (e) {
                    console.error('  ❌ JSON Parse Error:', e.message);
                    console.log('  Body received:', body);
                }

                // Fallback to original response
                clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
                clientRes.end(body);
            });
        } else {
            // Normal piping
            let statusCode = proxyRes.statusCode;
            const headers = { ...proxyRes.headers };

            if (headers.location) {
                console.log(`  🔗 Redirect detected: ${headers.location}`);
                if (headers.location.startsWith('/')) {
                    headers.location = `${FRONTEND_URL}${headers.location}`;
                } else if (headers.location.includes('127.0.0.1:8000') || headers.location.includes('localhost:8000')) {
                    headers.location = headers.location.replace(/127\.0\.0\.1:8000|localhost:8000/, 'localhost:5173');
                }
                console.log(`  🔄 Rewritten to: ${headers.location}`);
            }

            clientRes.writeHead(statusCode, headers);
            proxyRes.pipe(clientRes);
        }
    });

    proxyReq.on('error', (e) => {
        console.error(`  ❌ PROXY ERROR: ${e.message}`);
        clientRes.writeHead(502);
        clientRes.end('Proxy Error: Backend is down or unreachable.');
    });

    clientReq.pipe(proxyReq);
});

server.listen(LOCAL_PORT);
