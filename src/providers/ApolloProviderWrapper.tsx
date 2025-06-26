import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apolloClient'
import { initializeAuthService } from '@/features/auth/services'
import type { ReactNode } from 'react'

// Inicializar o authService com o Apollo Client
initializeAuthService(apolloClient)

export const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
