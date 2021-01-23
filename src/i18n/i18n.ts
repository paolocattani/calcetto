import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// https://linguinecode.com/post/lazy-loading-react-i18next-translations
i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		debug: false,
		//## Langs
		// Language to use (overrides language detection)
		// lng: 'it-IT',
		// Array of allowed languages
		supportedLngs: ['it-IT', 'en-US'],
		// Language to use if translations in user language are not available.
		fallbackLng: 'en-US',

		//## Namespaces
		// String or array of namespaces to load
		ns: ['common', 'auth', 'tournament', 'pair', 'stage1', 'stage2', 'stats'],
		// Default namespace used if not passed to translation function
		defaultNS: 'common',
		// String or array of namespaces to lookup key if not found in given namespace.
		fallbackNS: ['common'],

		//## Load options
		// Array of languages to preload.
		preload: ['it-IT'],
		/**
		 * Language codes to lookup, given set language is
		 * 'en-US': 'all' --> ['en-US', 'en', 'dev'],
		 * 'currentOnly' --> 'en-US',
		 * 'languageOnly' --> 'en'
		 */
		load: 'currentOnly',
		interpolation: {
			// react already safes from xss
			escapeValue: false,
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
	});

export default i18n;

export const getOtherLang = () => (i18n.language === 'it-IT' ? 'en-US' : 'it-IT');
