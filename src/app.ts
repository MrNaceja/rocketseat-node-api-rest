import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { logRoutesAccessMiddleware } from "@/middlewares/log-routes-access.ts";
import { transactionsRoutes } from "@/routes/transactions/index.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCookie, {
  secret: "_5up3r_53cr3t",
});

app.addHook("preHandler", logRoutesAccessMiddleware);

app.register(transactionsRoutes);

export default app;
