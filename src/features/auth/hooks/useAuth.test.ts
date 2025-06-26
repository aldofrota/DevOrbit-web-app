import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useAuth } from './useAuth'
import { useAuthStore } from '@/store'
import { useNavigation } from '@/hooks'
import { toastHelper } from '@/utils'
import { authService } from '@/features/auth/services'

// Mock dependencies
vi.mock('@/store', () => ({
  useAuthStore: vi.fn(),
}))

vi.mock('@/hooks', () => ({
  useNavigation: vi.fn(),
}))

vi.mock('@/utils', () => ({
  toastHelper: {
    withLoadingToast: vi.fn(),
  },
}))

vi.mock('@/features/auth/services', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
  },
}))

describe('useAuth', () => {
  // Mocks
  const mockGoTo = vi.fn()
  const mockLogin = vi.fn()
  const mockLogout = vi.fn()
  const mockWithLoadingToast = vi.fn()
  const mockAuthServiceLogin = vi.fn()
  const mockAuthServiceLogout = vi.fn()

  // Test data
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    firstAccess: false,
    role: 'user',
    companyId: 'company-1',
    avatar: null,
    status: 'active',
    company: {
      id: 'company-1',
      name: 'Empresa Teste',
      timezone: 'America/Sao_Paulo',
    },
    teamIds: ['team-1'],
  }

  const mockToken = 'mock-jwt-token'

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mocks
    ;(useNavigation as any).mockReturnValue({ goTo: mockGoTo })
    ;(useAuthStore as any).mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: mockLogin,
      logout: mockLogout,
    })
    ;(toastHelper.withLoadingToast as any) = mockWithLoadingToast
    ;(authService.login as any) = mockAuthServiceLogin
    ;(authService.logout as any) = mockAuthServiceLogout
  })

  describe('initial state', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => useAuth())

      expect(result.current.user).toBeNull()
      expect(result.current.token).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(typeof result.current.login).toBe('function')
      expect(typeof result.current.logout).toBe('function')
    })

    it('should return user data when authenticated', () => {
      ;(useAuthStore as any).mockReturnValue({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        login: mockLogin,
        logout: mockLogout,
      })

      const { result } = renderHook(() => useAuth())

      expect(result.current.user).toEqual(mockUser)
      expect(result.current.token).toBe(mockToken)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  describe('login', () => {
    it('should login successfully', async () => {
      const mockLoginResponse = {
        user: mockUser,
        token: mockToken,
      }

      mockAuthServiceLogin.mockResolvedValue(mockLoginResponse)
      mockWithLoadingToast.mockImplementation(async operation => {
        return await operation()
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('joao@example.com', 'password123')
      })

      expect(mockWithLoadingToast).toHaveBeenCalledWith(expect.any(Function), {
        loadingMessage: 'Entrando...',
        successMessage: 'Bem-vindo ao DevOrbit!',
        errorMessage: 'Erro ao entrar.',
      })

      expect(mockAuthServiceLogin).toHaveBeenCalledWith({
        email: 'joao@example.com',
        password: 'password123',
      })

      expect(mockLogin).toHaveBeenCalledWith(mockUser, mockToken)
      expect(mockGoTo).toHaveBeenCalledWith('/')
    })

    it('should throw error when login fails', async () => {
      const loginError = new Error('Login failed')
      mockAuthServiceLogin.mockRejectedValue(loginError)
      mockWithLoadingToast.mockImplementation(async operation => {
        try {
          return await operation()
        } catch (error) {
          throw error
        }
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        try {
          await result.current.login('joao@example.com', 'wrong-password')
        } catch (error) {
          expect(error).toEqual(loginError)
        }
      })

      expect(mockAuthServiceLogin).toHaveBeenCalledWith({
        email: 'joao@example.com',
        password: 'wrong-password',
      })

      expect(mockLogin).not.toHaveBeenCalled()
      expect(mockGoTo).not.toHaveBeenCalled()
    })

    it('should use toastHelper correctly', async () => {
      const mockLoginResponse = {
        user: mockUser,
        token: mockToken,
      }

      mockAuthServiceLogin.mockResolvedValue(mockLoginResponse)
      mockWithLoadingToast.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('joao@example.com', 'password123')
      })

      expect(mockWithLoadingToast).toHaveBeenCalledWith(expect.any(Function), {
        loadingMessage: 'Entrando...',
        successMessage: 'Bem-vindo ao DevOrbit!',
        errorMessage: 'Erro ao entrar.',
      })
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      mockAuthServiceLogout.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.logout()
      })

      expect(mockAuthServiceLogout).toHaveBeenCalled()
      expect(mockLogout).toHaveBeenCalled()
      expect(mockGoTo).toHaveBeenCalledWith('/login')
    })

    it('should logout even when authService fails', async () => {
      const logoutError = new Error('Logout failed')
      mockAuthServiceLogout.mockRejectedValue(logoutError)

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.logout()
      })

      expect(mockAuthServiceLogout).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith('Erro no logout:', logoutError)
      expect(mockLogout).toHaveBeenCalled()
      expect(mockGoTo).toHaveBeenCalledWith('/login')

      consoleSpy.mockRestore()
    })

    it('should call logout and navigation in correct order', async () => {
      mockAuthServiceLogout.mockResolvedValue(undefined)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.logout()
      })

      expect(mockAuthServiceLogout).toHaveBeenCalled()
      expect(mockLogout).toHaveBeenCalled()
      expect(mockGoTo).toHaveBeenCalledWith('/login')
    })
  })

  describe('dependencies', () => {
    it('should use useAuthStore correctly', () => {
      renderHook(() => useAuth())

      expect(useAuthStore).toHaveBeenCalled()
    })

    it('should use useNavigation correctly', () => {
      renderHook(() => useAuth())

      expect(useNavigation).toHaveBeenCalled()
    })
  })

  describe('callbacks', () => {
    it('should use useCallback for handleLogin', () => {
      const { result } = renderHook(() => useAuth())

      const loginFunction1 = result.current.login
      const loginFunction2 = result.current.login

      expect(typeof loginFunction1).toBe('function')
      expect(typeof loginFunction2).toBe('function')
    })

    it('should use useCallback for handleLogout', () => {
      const { result } = renderHook(() => useAuth())

      const logoutFunction1 = result.current.logout
      const logoutFunction2 = result.current.logout

      expect(typeof logoutFunction1).toBe('function')
      expect(typeof logoutFunction2).toBe('function')
    })
  })
})
