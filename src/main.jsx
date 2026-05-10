import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    import('virtual:pwa-register').then(({ registerSW }) => {
      registerSW({
        onNeedRefresh() {
          if (confirm('New content available! Click OK to update.')) {
            window.location.reload()
          }
        },
        onOfflineReady() {
          console.log('App ready to work offline!')
        }
      })
    }).catch(() => {
      // PWA registration failed silently in dev
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
