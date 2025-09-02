import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WeddingFit',
        short_name: 'WeddingFit',
        description: 'MZ 세대를 위한 결혼 준비 자금 특화 금융비서',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/weddingfit-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/weddingfit-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/weddingfit-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],
    }),
  ],
  css: {
    postcss: './postcss.config.js', 
  },
})