import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Esto permite usar '@' como alias de la carpeta src
    },
    define: {
      global: {}, // Definir `global` como un objeto vacío
    },
  },
});