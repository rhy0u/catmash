import { ApolloServer } from 'apollo-server-express'
import { execute, validate } from 'graphql'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import config from 'server/config'
import * as Cats from './types/Cats'

const baseSchema = /* GraphQL */ `
  scalar Date
  scalar DateTime

  type Query {
    ping: Boolean!
  }

  type Mutation {
    ping: Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const baseResolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    ping: () => true,
  },
  Mutation: {
    ping: () => true,
  },
}

const buildSchema = (...types) =>
  new ApolloServer({
    typeDefs: [baseSchema, ...types.map(({ schema }) => schema)],
    resolvers: [baseResolvers, ...types.map(({ resolvers }) => resolvers)],
    playground: config.get('server.graphql.playground'),

    formatError: err => {
      /* eslint-disable-next-line no-console */
      console.error(err.message)
      return err
    },
  })

const server = buildSchema(Cats)

export const run = async (query, { variables = {}, context = {} } = {}) => {
  const validationErrors = validate(server.schema, query)
  if (validationErrors.length) {
    throw validationErrors[0]
  }

  const { data, errors } = await execute(
    server.schema,
    query,
    null,
    context,
    variables,
  )

  if (errors && errors.length) {
    const error = new Error(errors)
    error.graphqlErrors = errors
    throw error
  }
  return data
}

export default server
