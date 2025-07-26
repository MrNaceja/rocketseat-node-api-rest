import type { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./database/raw.db",
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
    extension: "ts",
  },
};

export default config;
