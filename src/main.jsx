import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider } from './context/RouterContext';
import './index.css';

/**
 * Nebula Infinite Web Application Entry Point.
 * Mounts the React application tree wrapped in ThemeProvider and RouterProvider
 * to the DOM element with id 'root'.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
