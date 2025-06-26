import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

export type Language = 'en' | 'pt' | 'es'

export const useLanguage = () => {
  const { i18n, t } = useTranslation()

  const currentLanguage = i18n.language as Language

  const changeLanguage = useCallback(
    (language: Language) => {
      i18n.changeLanguage(language)
      // Save to localStorage
      localStorage.setItem('i18nextLng', language)
    },
    [i18n],
  )

  const getAvailableLanguages = useCallback((): Array<{
    code: Language
    name: string
    nativeName: string
  }> => {
    return [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
      },
      {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português',
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
      },
    ]
  }, [])

  const getLanguageName = useCallback(
    (languageCode: Language): string => {
      const languages = getAvailableLanguages()
      const language = languages.find(lang => lang.code === languageCode)
      return language?.nativeName || languageCode
    },
    [getAvailableLanguages],
  )

  return {
    currentLanguage,
    changeLanguage,
    getAvailableLanguages,
    getLanguageName,
    t,
  }
}
