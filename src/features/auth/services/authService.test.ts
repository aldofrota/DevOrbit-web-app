import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { AuthService, createAuthService } from './authService'
import { useAuthStore } from '@/store'

// Mock do Apollo Client
const mockApolloClient = {
  mutate: vi.fn(),
} as any

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
    authService = createAuthService(mockApolloClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
    // Reset singleton for tests
    ;(AuthService as any).instance = undefined
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance always', () => {
      const instance1 = AuthService.getInstance(mockApolloClient)
      const instance2 = AuthService.getInstance(mockApolloClient)

      expect(instance1).toBe(instance2)
    })

    it('should create instance with Apollo Client', () => {
      expect(authService).toBeInstanceOf(AuthService)
    })

    it('should throw error if Apollo Client is not provided', () => {
      // Reset singleton before test
      ;(AuthService as any).instance = undefined

      expect(() => AuthService.getInstance()).toThrow(
        'ApolloClient is required for AuthService initialization',
      )
    })
  })

  describe('login', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        data: {
          login: {
            user: mockUser,
            token: mockToken,
          },
        },
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      const credentials = {
        email: 'joao@example.com',
        password: 'password123',
      }

      const result = await authService.login(credentials)

      expect(mockApolloClient.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
        variables: credentials,
      })

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      })
    })

    it('should throw error when login fails', async () => {
      const mockResponse = {
        data: {
          login: null,
        },
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      const credentials = {
        email: 'joao@example.com',
        password: 'wrong-password',
      }

      await expect(authService.login(credentials)).rejects.toThrow('Login failed')

      expect(mockApolloClient.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
        variables: credentials,
      })
    })

    it('should throw error when mutation fails', async () => {
      const networkError = new Error('Network error')
      mockApolloClient.mutate.mockRejectedValueOnce(networkError)

      const credentials = {
        email: 'joao@example.com',
        password: 'password123',
      }

      await expect(authService.login(credentials)).rejects.toThrow('Network error')
    })

    it('should throw error when data is empty', async () => {
      const mockResponse = {
        data: null,
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      const credentials = {
        email: 'joao@example.com',
        password: 'password123',
      }

      await expect(authService.login(credentials)).rejects.toThrow('Login failed')
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockResponse = {
        data: {
          logout: {
            success: true,
          },
        },
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      await authService.logout()

      expect(mockApolloClient.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
      })
    })

    it('should handle logout error', async () => {
      const networkError = new Error('Network error')
      mockApolloClient.mutate.mockRejectedValueOnce(networkError)

      await expect(authService.logout()).rejects.toThrow('Network error')
    })
  })

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const mockResponse = {
        data: {
          refreshToken: {
            token: 'new-token',
          },
        },
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      const result = await authService.refreshToken()

      expect(mockApolloClient.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
      })

      expect(result).toEqual({ token: 'new-token' })
    })

    it('should throw error when refresh fails', async () => {
      const mockResponse = {
        data: {
          refreshToken: null,
        },
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      await expect(authService.refreshToken()).rejects.toThrow('Token refresh failed')
    })

    it('should throw error when data is empty', async () => {
      const mockResponse = {
        data: null,
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

      await expect(authService.refreshToken()).rejects.toThrow('Token refresh failed')
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      ;(useAuthStore.getState as any).mockReturnValue({
        token: mockToken,
        user: mockUser,
      })

      const result = authService.isAuthenticated()

      expect(result).toBe(true)
      expect(useAuthStore.getState).toHaveBeenCalled()
    })

    it('should return false when no token exists', () => {
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
          login: {
            user: mockUser,
            token: mockToken,
          },
        },
      }

      mockApolloClient.mutate.mockResolvedValueOnce(mockResponse)

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

  describe('factory function', () => {
    it('should create instance with createAuthService', () => {
      const newAuthService = createAuthService(mockApolloClient)

      expect(newAuthService).toBeInstanceOf(AuthService)
      expect(newAuthService).toBe(authService) // Same singleton instance
    })
  })
})
