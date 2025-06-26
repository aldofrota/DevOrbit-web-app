import { useThemeStore } from '@/store/themeStore'
import { useEffect } from 'react'

export const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }
}
