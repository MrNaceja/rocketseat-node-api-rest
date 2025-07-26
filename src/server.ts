import fastify from "fastify";

const server = fastify();

server.get("/", async () => {
  return {
    message: "Hello World",
  };
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
