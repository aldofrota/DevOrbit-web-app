import { httpClient } from '@/lib/httpClient'
import { useAuthStore } from '@/store'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/features/auth/types'

export class AuthService {
  private static instance: AuthService

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post('/auth/login', credentials)
      const result = response.data

      if (!result || !result.user || !result.token) {
        throw new Error('Login failed')
      }

      if (!result.user.id || !result.user.name || !result.user.email || !result.user.username) {
        throw new Error('Invalid user data received from server')
      }

      return result
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Login failed')
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post('/auth/register', credentials)
      const result = response.data

      if (!result || !result.user || !result.token) {
        throw new Error('Registration failed')
      }

      return result
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Registration failed')
    }
  }

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await httpClient.get('/auth/me')
      return response.data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Failed to get current user')
    }
  }

  isAuthenticated(): boolean {
    const { token } = useAuthStore.getState()
    return !!token
  }

  getToken(): string | null {
    const { token } = useAuthStore.getState()
    return token
  }

  getUser() {
    const { user } = useAuthStore.getState()
    return user
  }
}

export const authService = AuthService.getInstance()
