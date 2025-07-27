import type { FastifyRequest } from "fastify";

export const logRoutesAccessMiddleware = async (req: FastifyRequest) => {
  console.info(`${req.method.toUpperCase()}::${req.url}`);
};
