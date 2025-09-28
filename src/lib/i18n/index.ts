import { es } from './locales/es'
import { en } from './locales/en'

export type Locale = 'es' | 'en'

export const translations = {
  es,
  en
} as const

export const defaultLocale: Locale = 'es'

export type TranslationKey = keyof typeof es

// Utility function to get nested translation
export function getTranslation(
  locale: Locale,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Fallback to default locale if key not found
      if (locale !== defaultLocale) {
        return getTranslation(defaultLocale, key, fallback)
      }
      return fallback || key
    }
  }
  
  return typeof value === 'string' ? value : fallback || key
}

// Hook for using translations
export function useTranslations(locale: Locale = defaultLocale) {
  return {
    t: (key: string, fallback?: string) => getTranslation(locale, key, fallback),
    locale,
    translations: translations[locale]
  }
}

// Category translation helper
export function getCategoryTranslation(
  categoryKey: string,
  locale: Locale = defaultLocale,
  field: 'name' | 'description' = 'name'
): string {
  const key = `categories.${categoryKey}.${field}`
  return getTranslation(locale, key, categoryKey)
}

// Available locales
export const availableLocales: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'en', name: 'English', nativeName: 'English' }
]