import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_logs', function (table) {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table
      .uuid('order_id')
      .references('id')
      .inTable('orders')
      .notNullable();
    table.timestamp('time').defaultTo(knex.fn.now());
    table.string('description').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_logs');
}
