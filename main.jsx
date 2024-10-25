import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './style.css';
import App from './app';
import store from '@/context/store';
import '@/config/i18n'; // Asegurar que i18next esté inicializado

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);