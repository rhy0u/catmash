import { connect as connectDatabase } from 'server/services/database'
import { truncateAll } from 'server/utils/database'

export async function seed(knex) {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.FORCE_SEED !== 'true'
  ) {
    throw new Error('Impossible to run seeds in production')
  }

  const originalDestroy = knex.destroy
  knex.destroy = () => {}
  await truncateAll(knex)
  knex.destroy = originalDestroy
  connectDatabase()
}
