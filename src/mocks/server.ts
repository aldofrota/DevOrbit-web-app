import { createServer } from 'miragejs'
import { createGraphQLHandler } from '@miragejs/graphql'
import { typeDefs } from '@/mocks/schemas'
import { resolvers } from '@/mocks/resolvers'

export function makeServer() {
  return createServer({
    routes() {
      this.post('/query', createGraphQLHandler(typeDefs, this.schema, { resolvers }))
    },
  })
}
