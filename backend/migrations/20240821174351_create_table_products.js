
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', table=>{
      table.increments('id').primary()
      table.string('name').notNull()
      table.float('price', 1000).notNull()
      table.string('imageUrl', 1000)
      table.integer('categoryId').references('id')
      .inTable('categories').notNull()
    })
};
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products')
};
  
