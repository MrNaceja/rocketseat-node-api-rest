import { randomUUID } from "node:crypto";
import type { FastifyInstanceWithZod, FastifySchema } from "fastify";
import { StatusCodes } from "http-status-codes";
import z4 from "zod/v4";
import { db } from "@/config/db.ts";

const schema = {
  body: z4.object({
    title: z4.string().nonempty("A transaction title is needed."),
    amount: z4
      .number("A transaction amount value is needed.")
      .min(0.5, "The amount minimum is 0.5."),
    type: z4.enum(
      ["credit", "debit"],
      "Please, choose a credit or debit as transaction type."
    ),
  }),
  response: {
    [StatusCodes.CREATED]: z4.object({
      transactionCreated: z4
        .object({
          id: z4.string(),
        })
        .optional(),
    }),
  },
} satisfies FastifySchema;

export const createTransactionRoute = async (server: FastifyInstanceWithZod) =>
  server.post("/transactions", { schema }, async (req, rep) => {
    const { title, amount, type } = req.body;

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      rep.setCookie("sessionId", sessionId, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    const [transactionCreated] = await db("transactions")
      .insert({
        title,
        amount: {
          credit: amount,
          debit: amount * -1,
        }[type],
        session_id: sessionId,
      })
      .returning("id");

    return rep.status(StatusCodes.CREATED).send({
      transactionCreated,
    });
  });
