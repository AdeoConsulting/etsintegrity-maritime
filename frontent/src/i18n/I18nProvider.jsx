import { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react'
import { translations } from './translations'

const I18nContext = createContext(null)
const STORAGE_KEY = 'eim-lang'

// Resolve a dot path: t('hero.badges.compliance')
function resolve(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    if (saved && translations[saved]) return saved
    const browser = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'fr'
    return translations[browser] ? browser : 'fr'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((l) => {
    if (translations[l]) setLangState(l)
  }, [])

  const t = useCallback((path, fallback = path) => {
    const value = resolve(translations[lang], path)
    if (value === undefined) {
      const fb = resolve(translations.fr, path)
      return fb !== undefined ? fb : fallback
    }
    return value
  }, [lang])

  // Raw tree accessor for arrays/objects
  const tree = useMemo(() => translations[lang] || translations.fr, [lang])

  const value = useMemo(() => ({ lang, setLang, t, tree }), [lang, setLang, t, tree])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}