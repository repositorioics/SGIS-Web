import { createSlice } from '@reduxjs/toolkit';

const autenticacionSlice = createSlice({
  name: 'autenticacion',
  initialState: {
    autenticado: false,
    usuario: null,
    otpEnviado: false,
  },
  reducers: {
    inicioSesionExitoso: (state, action) => {
      state.autenticado = true;
      state.usuario = action.payload;
    },
    cerrarSesion: (state) => {
      state.autenticado = false;
      state.usuario = null;
    },
    otpEnviadoExitoso: (state) => {
      state.otpEnviado = true;
    },
    reiniciarOtp: (state) => {
      state.otpEnviado = false;
    },
  },
});

export const { inicioSesionExitoso, cerrarSesion, otpEnviadoExitoso, reiniciarOtp } = autenticacionSlice.actions;
export default autenticacionSlice.reducer;