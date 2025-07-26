import z4 from "zod/v4";

const envSchema = z4.object({
  DATABASE_URL: z4.string(),
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
