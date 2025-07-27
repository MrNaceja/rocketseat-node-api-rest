import z4 from "zod/v4";

const envSchema = z4.object({
  DATABASE_URL: z4.string(),
  PORT: z4.coerce.number().default(3333),
  DATABASE_CLIENT: z4.enum(["pg", "sqlite"]),
  NODE_ENV: z4
    .enum(["development", "test", "production"])
    .default("development"),
});

class EnvError extends Error {
  constructor(treefiedError: { [key: string]: { errors: string[] } }) {
    super(
      `Enviroment variable(s) errors. ${JSON.stringify(treefiedError, null, 4)}`
    );
  }
}

const _env = envSchema.safeParse(process.env);

if (_env.error) {
  throw new EnvError(z4.treeifyError(_env.error).properties || {});
}

export const env = _env.data;
