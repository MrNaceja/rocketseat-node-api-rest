import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTableIfNotExists("transactions", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.text("title").notNullable();
    table.decimal("amount", 10, 2).notNullable().defaultTo(0);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.uuid("session_id").after("id").index();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("transactions");
}
