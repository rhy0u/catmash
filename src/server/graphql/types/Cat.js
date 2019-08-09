import Cat from 'server/models/Cat'

const BASE_SCORE = 1000
const K = 30

export const schema = /* GraphQL */ `
  type Cat {
    id: ID!
    score: Int!
  }

  extend type Query {
    cats: [Cat!]!
  }

  extend type Mutation {
    updateCatScore(looserId: ID!, winnerId: ID!): [Cat!]!
  }
`
export const resolvers = {
  Query: {
    cats: async () => Cat.query(),
  },
  Mutation: {
    updateCatScore: async (object, { looserId, winnerId }) => {
      const looser =
        (await Cat.query().findById(looserId)) ||
        (await Cat.query().insertAndFetch({
          id: looserId,
          score: BASE_SCORE,
        }))
      const winner =
        (await Cat.query().findById(winnerId)) ||
        (await Cat.query().insertAndFetch({
          id: winnerId,
          score: BASE_SCORE,
        }))

      const plooser = 1.0 / (1.0 + 10 ** ((winner.score - looser.score) / 400))
      const pwinner = 1.0 / (1.0 + 10 ** ((winner.score - looser.score) / 400))

      const newLooserScore = Math.round(looser.score + K * (0 - plooser))
      const newWinnerScore = Math.round(winner.score + K * (1 - pwinner))

      await winner.$query().patchAndFetch({ score: newWinnerScore })
      await looser.$query().patchAndFetch({ score: newLooserScore })

      return [winner, looser]
    },
  },
}
