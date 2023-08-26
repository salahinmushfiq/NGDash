import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { MapContextProvider } from './contexts/MapContextProvider';
import { ProductContextProvider } from './contexts/ProductContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <MapContextProvider>
        
          <App/>
        
      </MapContextProvider>
    </ContextProvider>
  </React.StrictMode>
);


