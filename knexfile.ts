import type { Knex } from "knex";
import { env } from "@/config/env.ts";

const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === "pg"
      ? env.DATABASE_URL
      : {
          filename: env.DATABASE_URL,
        },
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
    extension: "ts",
  },
};

export default config;
