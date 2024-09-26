
exports.up = function(knex, Promise) {
    return knex.schema.createTable('productHistory', table=>{
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dateHistory')
  };
  

