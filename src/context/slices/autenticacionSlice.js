// src/context/slices/autenticacionSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial de la autenticación
const initialState = {
  usuario: null,
  roles: [],
  permisos: [],
  autenticado: false
};

// Slice de autenticación
const autenticacionSlice = createSlice({
  name: 'autenticacion',
  initialState,
  reducers: {
    iniciarSesion: (state, action) => {
      state.usuario = action.payload.email;
      state.roles = action.payload.roles;
      state.permisos = action.payload.permisos;
      state.autenticado = true;
    },
    cerrarSesion: (state) => {
      state.usuario = null;
      state.roles = [];
      state.permisos = [];
      state.autenticado = false;
    }
  }
});

export const { iniciarSesion, cerrarSesion } = autenticacionSlice.actions;

export default autenticacionSlice.reducer;