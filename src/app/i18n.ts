import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../assets/locales/en.json';
import zhCNTranslation from '../assets/locales/zh-CN.json';

const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined';

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
      order: isBrowser ? ['localStorage', 'navigator'] : [],
      caches: isBrowser ? ['localStorage'] : [],
    },
  });

if (isBrowser) {
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
  });

  document.documentElement.lang = i18n.language || 'en';
}

export default i18n;
