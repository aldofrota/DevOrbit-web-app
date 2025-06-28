import { Response } from 'miragejs'
import { faker } from '@faker-js/faker/locale/pt_BR'
import type { AuthResponse } from '@/features/auth/types'

export const authHandlers = {
  login(_: any, request: any) {
    const { email, password } = JSON.parse(request.requestBody)

    if (email && password) {
      const response: AuthResponse = {
        user: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: email,
          avatarUrl: faker.image.avatar(),
          username: faker.internet.username(),
        },
        token: faker.string.alphanumeric(32),
      }

      return new Response(200, {}, response)
    }

    return new Response(401, {}, { message: 'Credenciais inválidas' })
  },

  register(_: any, request: any) {
    const { name, email, password } = JSON.parse(request.requestBody)

    if (name && email && password) {
      const response: AuthResponse = {
        user: {
          id: faker.string.uuid(),
          name,
          email,
          avatarUrl: faker.image.avatar(),
          username: faker.internet.username(),
        },
        token: faker.string.alphanumeric(32),
      }

      return new Response(201, {}, response)
    }

    return new Response(400, {}, { message: 'Dados inválidos' })
  },

  me() {
    const response = {
      user: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
        username: faker.internet.username(),
      },
    }

    return new Response(200, {}, response)
  },
}
