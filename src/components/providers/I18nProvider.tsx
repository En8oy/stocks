'use client'

import { ReactNode } from 'react'
import { I18nContext, createI18nContextValue } from '@/hooks/useI18n'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const value = createI18nContextValue()

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}