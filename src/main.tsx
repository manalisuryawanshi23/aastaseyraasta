import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Automatic cache version sync to clear old browser localStorage
if (typeof window !== 'undefined') {
  const CURRENT_VERSION = 'v2_master_dataset_benefits_v3';
  if (localStorage.getItem('aastha_cache_version') !== CURRENT_VERSION) {
    localStorage.clear();
    localStorage.setItem('aastha_cache_version', CURRENT_VERSION);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
