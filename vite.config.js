import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['laplacitarestaurante.com'],
    proxy: {
      // Las consultas de datos pasan por la API Node/Express (Prisma).
      '/api': 'http://localhost:3001',
    },
  },
})