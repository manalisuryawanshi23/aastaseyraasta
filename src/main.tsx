import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Automatic cache version sync to clear old browser localStorage
if (typeof window !== 'undefined') {
  const CURRENT_VERSION = 'v3_pwa_synced';
  if (localStorage.getItem('aastha_cache_version') !== CURRENT_VERSION) {
    localStorage.clear();
    localStorage.setItem('aastha_cache_version', CURRENT_VERSION);
  }

  // Register PWA Service Worker
  if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'test') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
