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
    register: vi.fn(),
  },
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('useAuth', () => {
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    username: 'joao',
    avatarUrl: null,
  }

  const mockToken = 'mock-jwt-token'
  const mockLoginResponse = {
    user: mockUser,
    token: mockToken,
  }

  const mockLogin = vi.fn()
  const mockLogout = vi.fn()
  const mockGoTo = vi.fn()
  const mockWithLoadingToast = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useAuthStore as any).mockReturnValue({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
      login: mockLogin,
      logout: mockLogout,
    })
    ;(useNavigation as any).mockReturnValue({
      goTo: mockGoTo,
    })
    ;(toastHelper.withLoadingToast as any) = mockWithLoadingToast
    ;(authService.login as any) = vi.fn()
    ;(authService.register as any) = vi.fn()
  })

  describe('login', () => {
    it('should login successfully', async () => {
      mockWithLoadingToast.mockImplementation(async operation => {
        return await operation()
      })
      ;(authService.login as any).mockResolvedValue(mockLoginResponse)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('joao@example.com', 'password123')
      })

      expect(mockWithLoadingToast).toHaveBeenCalledWith(expect.any(Function), {
        loadingMessage: 'auth.loginLoading',
        successMessage: 'auth.loginSuccess',
        errorMessage: 'auth.loginError',
      })

      expect(authService.login).toHaveBeenCalledWith({
        email: 'joao@example.com',
        password: 'password123',
      })

      expect(mockLogin).toHaveBeenCalledWith(mockUser, mockToken)
      expect(mockGoTo).toHaveBeenCalledWith('/')
    })

    it('should handle login error', async () => {
      const loginError = new Error('Credenciais inválidas')
      mockWithLoadingToast.mockImplementation(async operation => {
        try {
          return await operation()
        } catch (error) {
          throw error
        }
      })
      ;(authService.login as any).mockRejectedValue(loginError)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        try {
          await result.current.login('joao@example.com', 'wrong-password')
        } catch (error) {
          // Expected error
        }
      })

      expect(authService.login).toHaveBeenCalledWith({
        email: 'joao@example.com',
        password: 'wrong-password',
      })
    })
  })

  describe('register', () => {
    it('should register successfully', async () => {
      mockWithLoadingToast.mockImplementation(async operation => {
        return await operation()
      })
      ;(authService.register as any).mockResolvedValue(mockLoginResponse)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.register('João Silva', 'joao@example.com', 'password123')
      })

      expect(mockWithLoadingToast).toHaveBeenCalledWith(expect.any(Function), {
        loadingMessage: 'auth.registerLoading',
        successMessage: 'auth.registerSuccess',
        errorMessage: 'auth.registerError',
      })

      expect(authService.register).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
      })

      expect(mockLogin).toHaveBeenCalledWith(mockUser, mockToken)
      expect(mockGoTo).toHaveBeenCalledWith('/')
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.logout()
      })

      expect(mockLogout).toHaveBeenCalled()
      expect(mockGoTo).toHaveBeenCalledWith('/login')
    })

    it('should logout even when there is an error', async () => {
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.logout()
      })

      expect(mockLogout).toHaveBeenCalled()
      expect(mockGoTo).toHaveBeenCalledWith('/login')
    })
  })

  describe('return values', () => {
    it('should return correct values from store', () => {
      const { result } = renderHook(() => useAuth())

      expect(result.current.user).toEqual(mockUser)
      expect(result.current.token).toBe(mockToken)
      expect(result.current.isAuthenticated).toBe(true)
      expect(typeof result.current.login).toBe('function')
      expect(typeof result.current.register).toBe('function')
      expect(typeof result.current.logout).toBe('function')
    })
  })
})
