import { Response } from 'miragejs'
import { faker } from '@faker-js/faker/locale/pt_BR'

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

export const authHandlers = {
  login(request: any) {
    const { email, password } = request

    // Simula validação de credenciais
    if (email && password) {
      const response: LoginResponse = {
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

    // Simula validação de dados
    if (name && email && password) {
      const response: LoginResponse = {
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
