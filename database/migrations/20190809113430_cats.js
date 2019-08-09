exports.up = async knex =>
  knex.schema.createTable('cats', table => {
    table.string('id').primary()
    table.string('photo_url')
    table.integer('score')
    table.timestamps(false, true)
  })
exports.down = async knex => knex.schema.dropTableIfExists('cats')
