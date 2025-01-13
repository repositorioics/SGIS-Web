import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './style.css';
import App from './app';
import store from '@/context/store';
import '@/config/i18n'; // Asegurar que i18next esté inicializado
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Puedes cambiar por otro adaptador si usas otro sistema de fechas
  
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>
);
