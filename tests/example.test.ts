import { StatusCodes } from "http-status-codes";
import { expect, test } from "vitest";

test("test description", () => {
  // create test call
  const statusCode = 200;
  // validate result expected
  expect(statusCode).toEqual(StatusCodes.OK); // Pass
  // expect(statusCode).toEqual(StatusCodes.UNAUTHORIZED); // Fail
});
