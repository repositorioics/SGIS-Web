import { configureStore } from '@reduxjs/toolkit';
import temaReducer from '@/context/slices/temaSlice';
import autenticacionReducer from '@/context/slices/autenticacionSlice';

const store = configureStore({
  reducer: {
    tema: temaReducer,
    autenticacion: autenticacionReducer,
  },
});

export default store;