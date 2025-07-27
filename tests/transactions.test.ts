import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import app from "@/app.ts";
import { db } from "@/config/db.ts";

describe("Transactions", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
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

  it("should select one transaction by id", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction Test",
        amount: 200,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");
    expect(cookies).toEqual([expect.stringContaining("sessionId")]);

    expect(createTransactionResponse.body).toEqual({
      transactionCreated: {
        id: expect.any(String),
      },
    });

    const { transactionCreated } = createTransactionResponse.body;

    const selectTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionCreated.id}`)
      .set("Cookie", cookies!)
      .expect(StatusCodes.OK);

    expect(selectTransactionResponse.body).toEqual({
      transaction: expect.objectContaining({
        title: "New Transaction Test",
        amount: 200,
      }),
    });
  });
});
