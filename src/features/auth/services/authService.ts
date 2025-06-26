import { ApolloClient, gql } from '@apollo/client'
import { useAuthStore } from '@/store'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: {
    id: string
    username: string
    name: string
    email: string
    avatarUrl: string | null
  }
  token: string
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        username
        name
        email
        avatarUrl
      }
      token
    }
  }
`

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      token
    }
  }
`

export class AuthService {
  private static instance: AuthService
  private apolloClient: ApolloClient<any>

  private constructor(apolloClient: ApolloClient<any>) {
    this.apolloClient = apolloClient
  }

  static getInstance(apolloClient?: ApolloClient<any>): AuthService {
    if (!AuthService.instance) {
      if (!apolloClient) {
        throw new Error('ApolloClient is required for AuthService initialization')
      }
      AuthService.instance = new AuthService(apolloClient)
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await this.apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: credentials,
    })

    const result = data?.login
    if (!result) {
      throw new Error('Login failed')
    }

    return result
  }

  async logout(): Promise<void> {
    await this.apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
    })
  }

  async refreshToken(): Promise<{ token: string }> {
    const { data } = await this.apolloClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
    })

    const result = data?.refreshToken
    if (!result) {
      throw new Error('Token refresh failed')
    }

    return result
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

// Factory function to create instance with Apollo Client
export const createAuthService = (apolloClient: ApolloClient<any>) => {
  return AuthService.getInstance(apolloClient)
}

// Default instance (will be configured later)
export let authService: AuthService

// Function to initialize authService with Apollo Client
export const initializeAuthService = (apolloClient: ApolloClient<any>) => {
  authService = createAuthService(apolloClient)
  return authService
}
