import "knex";
import type { Transaction } from "@/@types/transactions.js";

declare module "knex/types/tables.js" {
  export interface Tables {
    transactions: Transaction;
  }
}
