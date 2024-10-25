import { createSlice } from '@reduxjs/toolkit';
import i18n from '@/config/i18n';

const initialState = {
  language: 'es', // Idioma por defecto
};

const idiomaSlice = createSlice({
  name: 'idioma',
  initialState,
  reducers: {
    cambiarIdioma: (state, action) => {
      const newLanguage = action.payload;
      state.language = newLanguage;
      i18n.changeLanguage(newLanguage); // Cambia el idioma en i18next
    },
  },
});

export const { cambiarIdioma } = idiomaSlice.actions;
export default idiomaSlice.reducer;