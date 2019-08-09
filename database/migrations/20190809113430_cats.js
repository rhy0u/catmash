exports.up = async knex =>
  knex.schema.createTable('cats', table => {
    table.string('id').primary()
    table.integer('score').notNull()
    table.timestamps(false, true)
  })
exports.down = async knex => knex.schema.dropTableIfExists('cats')
