import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import pt from './locales/pt.js'
import es from './locales/es.js'
import fr from './locales/fr.js'

const supported = ['en', 'pt', 'es', 'fr']

const savedLocale = typeof localStorage !== 'undefined'
  ? localStorage.getItem('locale')
  : null

function detectLocale() {
  if (savedLocale && supported.includes(savedLocale)) return savedLocale
  if (typeof navigator === 'undefined') return 'en'
  const browserLang = navigator.language?.split('-')[0]
  return supported.includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { en, pt, es, fr },
})

export default i18n
