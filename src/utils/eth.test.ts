import { expect, test, describe } from "vitest";
import { getDailyTransactionCounts30Days } from "./eth";

describe("getDailyTransactionCounts30Days", () => {
  test("type and row count", async () => {
    const res = await getDailyTransactionCounts30Days();
    expect(res).toHaveLength(31);
    expect(res[0]).toHaveProperty("day");
    expect(res[0].day).toBeTypeOf("string");
    expect(res[0]).toHaveProperty("transaction_count");
    expect(res[0].transaction_count).toBeTypeOf("number");
  });
});
