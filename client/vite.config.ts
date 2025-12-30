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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers', '@emotion/react', '@emotion/styled'],
          'utils-vendor': ['axios', 'date-fns', 'dayjs', 'formik', 'yup', 'lucide-react'],
          'maps-vendor': ['leaflet', '@react-google-maps/api'],
        },
      },
    },
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
