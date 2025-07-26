import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("transactions", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("transactions", (table) => {
    table.uuid("id").alter();
  });
}
