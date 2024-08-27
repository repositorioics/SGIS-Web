import { createSlice } from '@reduxjs/toolkit';

const estadoInicial = {
  tema: 'claro',
};

const temaSlice = createSlice({
  name: 'tema',
  initialState: estadoInicial,
  reducers: {
    alternarTema: (state) => {
      state.tema = state.tema === 'claro' ? 'oscuro' : 'claro';
    },
  },
});

export const { alternarTema } = temaSlice.actions;

export default temaSlice.reducer;