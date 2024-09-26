
exports.up = function(knex, Promise) {
    return knex.schema.createTable('productDateHistory', table=>{
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.timestamp('dateBuyed')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dateHistory')
  };
  
