import { authHandlers } from '@/mocks/handlers'

export const authResolvers = {
  Mutation: {
    login: (_: any, { input }: any) => {
      return authHandlers.login(input)
    },
  },
}
