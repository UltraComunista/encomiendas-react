import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx', 'resources/css/app.css'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: { host: '192.168.100.118' }, // tu IP LAN (ajusta si cambia)
  },
})
