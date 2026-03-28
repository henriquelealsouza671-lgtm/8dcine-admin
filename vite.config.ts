import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: 'dist',
  },
  // Isso aqui ignora avisos que travam o deploy
  logLevel: 'info'
})