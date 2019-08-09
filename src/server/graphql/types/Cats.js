import Cat from 'server/models/Cat'

export const schema = /* GraphQL */ `
  type Cat {
    id: ID!
    score: Int!
    photoUrl: Int!
  }

  extend type Query {
    cats: [Cat!]!
  }

  extend type Mutation {
    createCat(catId: String!, score: Int!, photoUrl: String!): Cat!
    updateCatScore(catId: String!, score: Int!, photoUrl: String!): Cat!
  }
`
export const resolvers = {
  Query: {
    cats: async () => Cat.query(),
  },
  Mutation: {},
}
