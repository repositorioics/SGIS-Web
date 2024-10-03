import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';

// Clave de cifrado
const SECRET_KEY = 'mySecretKey123';

// Cifrar y descifrar datos
const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Configuración de persistencia con cifrado
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [{
    in: (state) => encrypt(state), 
    out: (state) => decrypt(state),
  }],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;