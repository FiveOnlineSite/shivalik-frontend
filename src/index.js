import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';

import './style/style.css';


const rootElement = document.getElementById('root');

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}