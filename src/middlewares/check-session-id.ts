import type { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export const checkSessionIdMiddleware = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return rep.status(StatusCodes.UNAUTHORIZED).send({
      message: "Unauthorized. Try create a transaction first.",
    });
  }
};
