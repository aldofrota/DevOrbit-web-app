import { createServer } from 'miragejs'
import { authHandlers } from '@/mocks/handlers'

export function makeServer() {
  return createServer({
    routes() {
      this.timing = 750

      this.post('/auth/login', authHandlers.login)
      this.post('/auth/signup', authHandlers.register)
      this.get('/auth/me', authHandlers.me)

      this.passthrough()
    },
  })
}
