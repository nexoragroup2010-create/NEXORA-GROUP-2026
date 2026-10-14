import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // caminhos relativos: funciona na raiz de um domínio e em subpastas (ex.: GitHub Pages)
  base: './',
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
