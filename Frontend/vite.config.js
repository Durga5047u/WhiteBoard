// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy:{
//       '/ws' :{
//         target: 'http://localhost:8080',
//         ws:true,
//         changeOrigin:true
//       },
//     },
//   },
//   define:{
//     global:'window',
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws': {
        target: 'https://whiteboard-backend-mj13.onrender.com',
        ws: true,
        changeOrigin: true
      },
      '/api': {
        target: 'https://whiteboard-backend-mj13.onrender.com',
        changeOrigin: true
      }
    }
  },
  define:{
    global:'window',
  },
})
