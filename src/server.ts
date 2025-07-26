import fastify from "fastify";
import { db } from "@/config/db.ts";

const server = fastify();

server.get("/", async () => {
  const transactions = await db("transactions").select("*");

  return transactions;
});

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
