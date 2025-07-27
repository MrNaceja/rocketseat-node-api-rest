import server from "@/app.ts";
import { env } from "@/config/env.ts";

server.listen(
  {
    port: env.PORT,
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
