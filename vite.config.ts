import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Esto asegura que se usen rutas relativas
  build: {
    outDir: 'docs', // Configura la salida del build en la carpeta 'docs'
  },
})
