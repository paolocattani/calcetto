import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'it',
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false, // we do not use keys in form messages.welcome
    fallbackLng: 'it' || 'en',
    load: 'currentOnly',
    react: {
      wait: true,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
