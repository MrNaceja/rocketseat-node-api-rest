import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { logRoutesAccessMiddleware } from "@/middlewares/log-routes-access.ts";
import { transactionsRoutes } from "@/routes/transactions/index.ts";

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(fastifyCookie, {
  secret: "_5up3r_53cr3t",
});

server.addHook("preHandler", logRoutesAccessMiddleware);

server.register(transactionsRoutes);

server.listen(
  {
    port: 3333,
    host: "0.0.0.0",
  },
  (err, address) => {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    console.info(`HTTP Server running on ${address}`);
  }
);
