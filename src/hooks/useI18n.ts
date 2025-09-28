'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Locale, defaultLocale, getTranslation, getCategoryTranslation } from '@/lib/i18n'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
  categoryT: (categoryKey: string, field?: 'name' | 'description') => string
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function createI18nContextValue(): I18nContextType {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'es' || savedLocale === 'en')) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (isClient) {
      localStorage.setItem('locale', newLocale)
    }
  }

  const t = (key: string, fallback?: string) => {
    return getTranslation(locale, key, fallback)
  }

  const categoryT = (categoryKey: string, field: 'name' | 'description' = 'name') => {
    return getCategoryTranslation(categoryKey, locale, field)
  }

  return {
    locale,
    setLocale,
    t,
    categoryT
  }
}