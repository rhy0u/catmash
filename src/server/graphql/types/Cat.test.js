import useDatabase from 'server/test/useDatabase'
import factory from 'server/test/factory'
import { run } from 'server/graphql/apolloServer'
import gql from 'graphql-tag'

useDatabase()

describe('Cat', () => {
  it('should get cats', async () => {
    await factory.createMany('cat', 2)

    const { cats } = await run(gql`
      query Cats {
        cats {
          id
        }
      }
    `)

    expect(cats).toHaveLength(2)
  })

  it('should update a cat score', async () => {
    const {
      updateCatScore: [nala, tao],
    } = await run(
      gql`
        mutation UpdateCatScore($winnerId: ID!, $looserId: ID!) {
          updateCatScore(winnerId: $winnerId, looserId: $looserId) {
            id
            score
          }
        }
      `,
      { variables: { winnerId: 'Nala', looserId: 'Tao' } },
    )

    expect(nala.score > tao.score).toBe(true)
  })
})
