export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    username: string
    name: string
    email: string
    avatarUrl: string | null
  }
  token: string
}
