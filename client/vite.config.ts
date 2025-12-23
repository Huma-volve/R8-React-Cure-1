import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
build: {
  chunkSizeWarningLimit: 1000,
},
  server: {
    proxy: {
      '/api': {
        target: 'https://round8-cure-php-team-two.huma-volve.com',
        changeOrigin: true,
        secure: true,
        followRedirects: false,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Log the response for debugging
            console.log('[Proxy]', proxyRes.statusCode, proxyRes.headers.location || '');
          });
        }
      }
    }
  }

})
