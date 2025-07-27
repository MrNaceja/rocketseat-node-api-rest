import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "@/app.ts";

describe("Transactions", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction Test",
        amount: 200,
        type: "credit",
      })
      .expect(StatusCodes.CREATED);
  });

  it("should list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction Test",
        amount: 200,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    expect(cookies).toEqual([expect.stringContaining("sessionId")]);

    const listAllTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
      .expect(StatusCodes.OK);

    expect(listAllTransactionsResponse.body).toEqual({
      transactions: [
        expect.objectContaining({
          title: "New Transaction Test",
          amount: 200,
        }),
      ],
    });
  });
});
