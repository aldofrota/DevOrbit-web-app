export const authSchemas = `
  input LoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    username: String!
    avatarUrl: String!
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload
  }

  type Query {
    users: [User]
  }
`
