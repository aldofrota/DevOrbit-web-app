import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { AuthService } from './authService'
import { useAuthStore } from '@/store'
import { httpClient } from '@/lib/httpClient'

// Mock do httpClient
vi.mock('@/lib/httpClient', () => ({
  httpClient: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

// Mock do useAuthStore
vi.mock('@/store', () => ({
  useAuthStore: {
    getState: vi.fn(),
  },
}))

describe('AuthService', () => {
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    username: 'joao',
    avatarUrl: null,
  }

  const mockToken = 'mock-jwt-token'
  let authService: AuthService

  beforeEach(() => {
    vi.clearAllMocks()
    authService = AuthService.getInstance()
  })

  afterEach(() => {
    vi.resetAllMocks()
    // Reset singleton for tests
    ;(AuthService as any).instance = undefined
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance always', () => {
      const instance1 = AuthService.getInstance()
      const instance2 = AuthService.getInstance()

      expect(instance1).toBe(instance2)
    })

    it('should create instance without parameters', () => {
      expect(authService).toBeInstanceOf(AuthService)
    })
  })

  describe('login', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        data: {
          user: mockUser,
          token: mockToken,
        },
      }

      ;(httpClient.post as any).mockResolvedValueOnce(mockResponse)

      const credentials = {
        email: 'joao@example.com',
        password: 'password123',
      }

      const result = await authService.login(credentials)

      expect(httpClient.post).toHaveBeenCalledWith('/auth/login', credentials)

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      })
    })

    it('should throw error when login fails', async () => {
      const mockResponse = {
        data: null,
      }

      ;(httpClient.post as any).mockResolvedValueOnce(mockResponse)

      const credentials = {
        email: 'joao@example.com',
        password: 'wrong-password',
      }

      await expect(authService.login(credentials)).rejects.toThrow('Login failed')

      expect(httpClient.post).toHaveBeenCalledWith('/auth/login', credentials)
    })

    it('should throw error when network fails', async () => {
      const networkError = new Error('Network error')
      ;(httpClient.post as any).mockRejectedValueOnce(networkError)

      const credentials = {
        email: 'joao@example.com',
        password: 'password123',
      }

      await expect(authService.login(credentials)).rejects.toThrow('Login failed')
    })

    it('should throw error when server returns error message', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Credenciais inválidas',
          },
        },
      }

      ;(httpClient.post as any).mockRejectedValueOnce(mockError)

      const credentials = {
        email: 'joao@example.com',
        password: 'wrong-password',
      }

      await expect(authService.login(credentials)).rejects.toThrow('Credenciais inválidas')
    })
  })

  describe('register', () => {
    it('should register successfully', async () => {
      const mockResponse = {
        data: {
          user: mockUser,
          token: mockToken,
        },
      }

      ;(httpClient.post as any).mockResolvedValueOnce(mockResponse)

      const credentials = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
      }

      const result = await authService.register(credentials)

      expect(httpClient.post).toHaveBeenCalledWith('/auth/register', credentials)

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      })
    })

    it('should throw error when registration fails', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Email já existe',
          },
        },
      }

      ;(httpClient.post as any).mockRejectedValueOnce(mockError)

      const credentials = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
      }

      await expect(authService.register(credentials)).rejects.toThrow('Email já existe')
    })
  })

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockResponse = {
        data: {
          user: mockUser,
          token: mockToken,
        },
      }

      ;(httpClient.get as any).mockResolvedValueOnce(mockResponse)

      const result = await authService.getCurrentUser()

      expect(httpClient.get).toHaveBeenCalledWith('/auth/me')

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      })
    })

    it('should throw error when getCurrentUser fails', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Token inválido',
          },
        },
      }

      ;(httpClient.get as any).mockRejectedValueOnce(mockError)

      await expect(authService.getCurrentUser()).rejects.toThrow('Token inválido')
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when user is authenticated', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: mockToken,
        user: mockUser,
      })

      const result = authService.isAuthenticated()

      expect(result).toBe(true)
      expect(useAuthStore.getState).toHaveBeenCalled()
    })

    it('should return false when user is not authenticated', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: null,
        user: null,
      })

      const result = authService.isAuthenticated()

      expect(result).toBe(false)
    })

    it('should return false when token is empty string', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: '',
        user: null,
      })

      const result = authService.isAuthenticated()

      expect(result).toBe(false)
    })
  })

  describe('getToken', () => {
    it('should return token when exists', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: mockToken,
        user: mockUser,
      })

      const result = authService.getToken()

      expect(result).toBe(mockToken)
      expect(useAuthStore.getState).toHaveBeenCalled()
    })

    it('should return null when no token exists', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: null,
        user: null,
      })

      const result = authService.getToken()

      expect(result).toBeNull()
    })
  })

  describe('getUser', () => {
    it('should return user when exists', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: mockToken,
        user: mockUser,
      })

      const result = authService.getUser()

      expect(result).toEqual(mockUser)
      expect(useAuthStore.getState).toHaveBeenCalled()
    })

    it('should return null when no user exists', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: null,
        user: null,
      })

      const result = authService.getUser()

      expect(result).toBeNull()
    })
  })

  describe('data validation', () => {
    it('should validate login response structure', async () => {
      const mockResponse = {
        data: {
          user: mockUser,
          token: mockToken,
        },
      }

      ;(httpClient.post as any).mockResolvedValueOnce(mockResponse)

      const credentials = {
        email: 'joao@example.com',
        password: 'password123',
      }

      const result = await authService.login(credentials)

      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('name')
      expect(result.user).toHaveProperty('email')
      expect(result.user).toHaveProperty('username')
      expect(result.user).toHaveProperty('avatarUrl')
      expect(result).toHaveProperty('token')
    })
  })
})
