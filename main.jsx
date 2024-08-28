import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './style.css';
import App from './App';
import store from '@/context/store';  // Asegúrate de que esta es la ruta correcta al store

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);