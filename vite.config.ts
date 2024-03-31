import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? 'https://mypymypy.github.io/vkui-forms/' : '/',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
})
