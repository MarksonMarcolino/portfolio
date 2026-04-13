import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import pt from './locales/pt.js'
import es from './locales/es.js'

const savedLocale = typeof localStorage !== 'undefined'
  ? localStorage.getItem('locale')
  : null

const i18n = createI18n({
  legacy: false,
  locale: savedLocale || 'en',
  fallbackLocale: 'en',
  messages: { en, pt, es },
})

export default i18n
