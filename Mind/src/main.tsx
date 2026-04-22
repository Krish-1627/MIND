import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider, IntentProvider } from './core/contexts';
import { ErrorBoundary } from './components/ErrorBoundary';

console.log('MIND Main Entry Point Executing');

const container = document.getElementById('root');
if (!container) {
  console.error('MIND: Root container not found');
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <UserProvider>
            <IntentProvider>
              <App />
            </IntentProvider>
          </UserProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('MIND: Initial Render Triggered');
  } catch (err) {
    console.error('MIND: Render Error', err);
    container.innerHTML = `<div style="color:red; padding:20px;">Render Error: ${err}</div>`;
  }
}
