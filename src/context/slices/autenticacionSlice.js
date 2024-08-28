import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  usuario: null,
  token: null,
};

const autenticacionSlice = createSlice({
  name: 'autenticacion',
  initialState,
  reducers: {
    iniciarSesion: (state, action) => {
      state.isAuthenticated = true;
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    },
    cerrarSesion: (state) => {
      state.isAuthenticated = false;
      state.usuario = null;
      state.token = null;
    },
  },
});

export const { iniciarSesion, cerrarSesion } = autenticacionSlice.actions;

export default autenticacionSlice.reducer;