import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsInFrench from '@/locales/fr/translation.json';
import translationsInEng from '@/locales/en/translation.json';

// the translations
const resources = {
  fr: {
    translation: translationsInFrench
  },
  en: {
    translation: translationsInEng
  },
};

i18n
  .use(LanguageDetector) // use langage detector to define default language.
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, // resources are important to load translations for the languages.
    lng: 'fr', // It acts as default language. When the site loads, content is shown in this language.
    fallbackLng: "fr", // use fr if selected language is not available
    debug: true,
    interpolation: {
      escapeValue: false // React already escape default value
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation",
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'], // Where check language settings
      caches: ['localStorage', 'cookie'] // Where store language settings
    }
});

export default i18n;