import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../assets/locales/en.json';
import zhCNTranslation from '../assets/locales/zh-CN.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  'zh-CN': {
    translation: zhCNTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safeguards from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Synchronize the HTML lang attribute with the active language
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial value immediately
if (document.documentElement) {
  document.documentElement.lang = i18n.language || 'en';
}

export default i18n;
