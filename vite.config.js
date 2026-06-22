import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/DEFQON.1-timetable/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'vite.svg'],
      manifest: {
        name: 'Sacred Oath Timetable',
        short_name: 'DQ1 Timetable',
        description: 'Offline timetable for Defqon.1 music festival',
        theme_color: '#0A0000',
        background_color: '#0A0000',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/DEFQON.1-timetable/',
        start_url: '/DEFQON.1-timetable/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,ttf,woff,woff2}'],
        // The background image is 4.2 MB, so we must raise the default Workbox size limit (2MB)
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
