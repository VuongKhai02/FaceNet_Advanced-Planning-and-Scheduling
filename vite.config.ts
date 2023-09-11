import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 6080,
    proxy: {
      "/api": {
        target: "http://localhost:6886",
        changeOrigin: true,
      },
    }
  },
  envDir: "./environments",
})

