import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tema: 'claro', // Puede ser 'claro' o 'oscuro'
};

const temaSlice = createSlice({
  name: 'tema',
  initialState,
  reducers: {
    alternarTema: (state) => {
      state.tema = state.tema === 'claro' ? 'oscuro' : 'claro';
    },
  },
});

export const { alternarTema } = temaSlice.actions;

export default temaSlice.reducer;