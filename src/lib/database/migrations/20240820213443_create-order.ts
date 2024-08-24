import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').notNullable();
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.boolean('kitchen_cancelled').defaultTo(false);
    table.boolean('kitchen_accepted').defaultTo(false);
    table.boolean('kitchen_dispatched').defaultTo(false);
    table.timestamp('kitchen_dispatched_time').nullable();
    table.timestamp('completed_time').nullable();
    table.integer('rider_id').nullable();
    table.boolean('kitchen_prepared').defaultTo(false);
    table.boolean('rider_assigned').defaultTo(false);
    table.boolean('paid').defaultTo(false);
    table.string('order_code').notNullable();
    table.string('order_change').nullable();
    table
      .uuid('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .nullable();
    table.timestamp('kitchen_verified_time').nullable();
    table.timestamp('kitchen_completed_time').nullable();
    table.boolean('shop_accepted').defaultTo(false);
    table.boolean('shop_prepared').defaultTo(false);
    table.integer('no_of_mealbags_delivered').defaultTo(0);
    table.integer('no_of_drinks_delivered').defaultTo(0);
    table.timestamp('rider_started_time').nullable();
    table.boolean('rider_started').defaultTo(false);
    table.timestamp('rider_arrived_time').nullable();
    table.boolean('rider_arrived').defaultTo(false);
    table.boolean('is_failed_trip').defaultTo(false);
    table.json('failed_trip_details').nullable();
    table.string('box_number').nullable();
    table.string('shelf_id').nullable();
    table.boolean('scheduled').defaultTo(false);
    table.integer('confirmed_by_id').nullable();
    table.integer('completed_by_id').nullable();
    table.date('scheduled_delivery_date').nullable();
    table.time('scheduled_delivery_time').nullable();
    table.boolean('is_hidden').defaultTo(false);
    table.uuid('order_type_id').references('id').inTable('order_types');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}
