import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Archivos de traducción
import en from '/src/locales/en.json';
import es from '/src/locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'es', // Idioma predeterminado
    interpolation: {
      escapeValue: false, // No es necesario para React
    },
  });

export default i18n;