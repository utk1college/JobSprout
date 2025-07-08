import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct for React 18
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
