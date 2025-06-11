// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/DEFQON.1-timetable/', // ✅ correct for GitHub Pages
  plugins: [react()],
})
