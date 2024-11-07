import { configureStore } from '@reduxjs/toolkit';
import autenticacionReducer from '@/context/slices/autenticacionSlice';
import idiomaReducer from '@/context/slices/idiomaSlice';
import notificationReducer from '@/context/slices/notificationSlice';

const store = configureStore({
  reducer: {
    autenticacion: autenticacionReducer,
    idioma: idiomaReducer,
    notifications: notificationReducer,
  },
});

export default store;