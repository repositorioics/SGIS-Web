import { configureStore } from '@reduxjs/toolkit';
import autenticacionReducer from '@/context/slices/autenticacionSlice';
import temaReducer from '@/context/slices/temaSlice';

const store = configureStore({
  reducer: {
    autenticacion: autenticacionReducer,
    tema: temaReducer,
  },
});

export default store;