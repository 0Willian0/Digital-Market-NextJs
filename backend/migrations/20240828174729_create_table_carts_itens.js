
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('cartItems', function(table) {
        table.increments('id').primary();
        table.integer('cart_id').unsigned().references('id').inTable('carts').onDelete('CASCADE');
        table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
        table.decimal('price', 10, 2).notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cartItems')
};
