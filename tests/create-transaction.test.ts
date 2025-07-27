import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { afterAll, beforeAll, test } from "vitest";
import app from "@/app.ts";

beforeAll(async () => {
  await app.ready();
});
afterAll(async () => {
  await app.close();
});

test("create a new transaction", async () => {
  await request(app.server)
    .post("/transactions")
    .send({
      title: "New Transaction Test",
      amount: 200,
      type: "credit",
    })
    .expect(StatusCodes.CREATED);
});
