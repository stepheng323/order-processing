import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('calculated_order_meals', function (table) {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table
      .uuid('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .notNullable();
    table.uuid('meal_id').references('id').inTable('meals').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('calculated_order_meals');
}
