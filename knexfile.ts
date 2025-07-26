import type { Knex } from "knex";
import { env } from "@/config/env.ts";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
    extension: "ts",
  },
};

export default config;
