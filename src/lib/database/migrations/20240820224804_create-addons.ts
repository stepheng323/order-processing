import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addons', function (table) {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('meal_id').references('id').inTable('meals').notNullable();
    table.double('amount').defaultTo(0).notNullable();
    table.boolean('is_combo').defaultTo(false);
    table.integer('position').defaultTo(0);
    table.integer('quantity').defaultTo(1);
    table.integer('internal_profit').defaultTo(0);
    table.string('min_selection_no').defaultTo('1');
    table.string('meal_addon_category_id').nullable();
    table.boolean('active').defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addons');
}
