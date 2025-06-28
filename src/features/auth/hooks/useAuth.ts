import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store'
import { useNavigation } from '@/hooks'
import { toastHelper } from '@/utils'
import { authService } from '@/features/auth/services'

export const useAuth = () => {
  const { t } = useTranslation()
  const { goTo } = useNavigation()
  const { user, token, isAuthenticated, login, logout } = useAuthStore()

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      await toastHelper.withLoadingToast(
        async () => {
          const result = await authService.login({ email, password })
          login(result.user, result.token)
          goTo('/')
        },
        {
          loadingMessage: t('auth.loginLoading'),
          successMessage: t('auth.loginSuccess'),
          errorMessage: t('auth.loginError'),
        },
      )
    },
    [login, goTo, t],
  )

  const handleRegister = useCallback(
    async (name: string, email: string, password: string) => {
      await toastHelper.withLoadingToast(
        async () => {
          const result = await authService.register({ name, email, password })
          login(result.user, result.token)
          goTo('/')
        },
        {
          loadingMessage: t('auth.registerLoading'),
          successMessage: t('auth.registerSuccess'),
          errorMessage: t('auth.registerError'),
        },
      )
    },
    [login, goTo, t],
  )

  const handleLogout = useCallback(async () => {
    logout()
    goTo('/login')
  }, [logout, goTo])

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }
}
