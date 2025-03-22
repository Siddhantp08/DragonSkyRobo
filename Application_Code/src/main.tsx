import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DroneProvider } from './context/DroneContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DroneProvider>
      <App />
    </DroneProvider>
  </StrictMode>
);