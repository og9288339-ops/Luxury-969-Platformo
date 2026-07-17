import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { "acquire": "Acquire", "title": "Institutional Assets" } },
    ar: { translation: { "acquire": "استحواذ", "title": "الأصول المؤسسية" } }
  },
  lng: "en", 
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;