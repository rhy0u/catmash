import * as database from 'server/services/database'
import { truncateAll } from 'server/utils/database'

function useDatabase() {
  beforeAll(async () => {
    const knex = database.connect()
    await knex.migrate.latest()
    await truncateAll(knex)
  })

  afterAll(async () => {
    await database.disconnect()
  })
}

export default useDatabase
