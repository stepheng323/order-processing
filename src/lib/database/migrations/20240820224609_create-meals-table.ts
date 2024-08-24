import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', function (table) {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.double('amount').defaultTo(0).notNullable();
    table.boolean('new').defaultTo(false);
    table.boolean('active').defaultTo(true);
    table.uuid('brand_id').references('id').inTable('brands');
    table.boolean('is_addon').defaultTo(false);
    table.boolean('is_combo').defaultTo(false);
    table.integer('quantity').notNullable();
    table.string('item_type').notNullable();
    table.string('description').nullable();
    table.string('calories').nullable();
    table.string('available_no').defaultTo('INFINITE');
    table.string('order_note').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('internal_profit').defaultTo(0);
    table.string('meal_category_id').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals');
}
