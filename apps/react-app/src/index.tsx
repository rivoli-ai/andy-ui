import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Import and register StencilJS web components
import { defineCustomElements } from '@omnifex/ui-components/loader';

// Register custom elements before rendering React
// Wrap in try-catch to handle any loader errors
try {
  defineCustomElements(window);
} catch (error) {
  console.warn('Error loading custom elements:', error);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
