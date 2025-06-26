import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config/i18n'

interface I18nProviderProps {
  children: React.ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize i18n when component mounts
    const savedLanguage = localStorage.getItem('i18nextLng')
    if (savedLanguage && ['en', 'pt', 'es'].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
