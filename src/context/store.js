import { configureStore } from '@reduxjs/toolkit';
import autenticacionReducer from '@/context/slices/autenticacionSlice';
import idiomaReducer from '@/context/slices/idiomaSlice';

const store = configureStore({
  reducer: {
    autenticacion: autenticacionReducer,
    idioma: idiomaReducer
  },
});

export default store;