import { useCallback } from 'react'
import { useAuthStore } from '@/store'
import { useNavigation } from '@/hooks'
import { toastHelper } from '@/utils'
import { authService } from '@/features/auth/services'

export const useAuth = () => {
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
          loadingMessage: 'Entrando...',
          successMessage: 'Bem-vindo ao DevOrbit!',
          errorMessage: 'Erro ao entrar.',
        },
      )
    },
    [login, goTo],
  )

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Erro no logout:', error)
    } finally {
      logout()
      goTo('/login')
    }
  }, [logout, goTo])

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  }
}
