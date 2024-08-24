import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('calculated_orders', function (table) {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('total_amount').notNullable();
    table.boolean('free_delivery').defaultTo(false);
    table.string('delivery_fee').notNullable();
    table.string('service_charge').notNullable();
    table.string('lat').notNullable();
    table.string('lng').notNullable();
    table.string('cokitchen_polygon_id').notNullable();
    table.uuid('user_id').notNullable();
    table.string('cokitchen_id').notNullable();
    table.boolean('pickup').defaultTo(false);
    table.string('prev_price').notNullable();
    table.json('address_details').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('calculated_orders');
}
