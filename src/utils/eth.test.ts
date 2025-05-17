import { expect, test, describe, it } from "vitest";
import {
  getBlocksInRangeBatched,
  getDailyTransactionCounts30Days,
  getLatestFinalizedBlock,
  rangeBigInt,
} from "./eth";

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

describe("getLatestFinalizedBlock", () => {
  test("type", async () => {
    const res = await getLatestFinalizedBlock();
    expect(res).toBeTypeOf("bigint");
  });
});

describe("getBlocksInRangeBatched", () => {
  test("range 1000000 - 1000001", async () => {
    const res = await getBlocksInRangeBatched({
      start: BigInt(1000000),
      end: BigInt(1000001),
    });
    expect(res).toMatchInlineSnapshot(`
      [
        {
          "baseFeePerGas": null,
          "blobGasUsed": undefined,
          "difficulty": 12549332509227n,
          "excessBlobGas": undefined,
          "extraData": "0xd783010303844765746887676f312e352e31856c696e7578",
          "gasLimit": 3141592n,
          "gasUsed": 50244n,
          "hash": "0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e",
          "logsBloom": "0x00000000000000000000000000000000000800000000000000000000000800000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000",
          "miner": "0x2a65aca4d5fc5b5c859090a6c34d164135398226",
          "mixHash": "0x92c4129a0ae2361b452a9edeece55c12eceeab866316195e3d87fc1b005b6645",
          "nonce": "0xcd4c55b941cf9015",
          "number": 1000000n,
          "parentHash": "0xb4fbadf8ea452b139718e2700dc1135cfc81145031c84b7ab27cd710394f7b38",
          "receiptsRoot": "0x20e3534540caf16378e6e86a2bf1236d9f876d3218fbc03958e6db1c634b2333",
          "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "size": 768n,
          "stateRoot": "0x0e066f3c2297a5cb300593052617d1bca5946f0caa0635fdb1b85ac7e5236f34",
          "timestamp": 1455404053n,
          "totalDifficulty": null,
          "transactions": [
            {
              "blockHash": "0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e",
              "blockNumber": 1000000n,
              "chainId": undefined,
              "from": "0x39fa8c5f2793459d6622857e7d9fbb4bd91766d3",
              "gas": 129244n,
              "gasPrice": 80525500000n,
              "hash": "0xea1093d492a1dcb1bef708f771a99a96ff05dcab81ca76c31940300177fcf49f",
              "input": "0x",
              "nonce": 21,
              "r": "0xa254fe085f721c2abe00a2cd244110bfc0df5f4f25461c85d8ab75ebac11eb10",
              "s": "0x30b7835ba481955b20193a703ebc5fdffeab081d63117199040cdf5a91c68765",
              "to": "0xc083e9947cf02b8ffc7d3090ae9aea72df98fd47",
              "transactionIndex": 0,
              "type": "legacy",
              "typeHex": "0x0",
              "v": 28n,
              "value": 100000000000000000000n,
            },
            {
              "blockHash": "0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e",
              "blockNumber": 1000000n,
              "chainId": undefined,
              "from": "0x32be343b94f860124dc4fee278fdcbd38c102d88",
              "gas": 50000n,
              "gasPrice": 60000000000n,
              "hash": "0xe9e91f1ee4b56c0df2e9f06c2b8c27c6076195a88a7b8537ba8313d80e6f124e",
              "input": "0x",
              "nonce": 17387,
              "r": "0x3b08715b4403c792b8c7567edea634088bedcd7f60d9352b1f16c69830f3afd5",
              "s": "0x10b9afb67d2ec8b956f0e1dbc07eb79152904f3a7bf789fc869db56320adfe09",
              "to": "0xdf190dc7190dfba737d7777a163445b7fff16133",
              "transactionIndex": 1,
              "type": "legacy",
              "typeHex": "0x0",
              "v": 28n,
              "value": 437194980000000000n,
            },
          ],
          "transactionsRoot": "0x65ba887fcb0826f616d01f736c1d2d677bcabde2f7fc25aa91cfbc0b3bad5cb3",
          "uncles": [],
        },
        {
          "baseFeePerGas": null,
          "blobGasUsed": undefined,
          "difficulty": 12555460113247n,
          "excessBlobGas": undefined,
          "extraData": "0xd783010303844765746887676f312e352e31856c696e7578",
          "gasLimit": 3141592n,
          "gasUsed": 21000n,
          "hash": "0xcb5cab7266694daa0d28cbf40496c08dd30bf732c41e0455e7ad389c10d79f4f",
          "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "miner": "0x2a65aca4d5fc5b5c859090a6c34d164135398226",
          "mixHash": "0xd5332614a151dd917b84fc5ff62580d7099edb7c37e0ac843d873de978d50352",
          "nonce": "0x9112b8c2b377fbe8",
          "number": 1000001n,
          "parentHash": "0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e",
          "receiptsRoot": "0xb873ddefdb56d448343d13b188241a4919b2de10cccea2ea573acf8dbc839bef",
          "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "size": 658n,
          "stateRoot": "0x7dd4aabb93795feba9866821c0c7d6a992eda7fbdd412ea0f715059f9654ef23",
          "timestamp": 1455404058n,
          "totalDifficulty": null,
          "transactions": [
            {
              "blockHash": "0xcb5cab7266694daa0d28cbf40496c08dd30bf732c41e0455e7ad389c10d79f4f",
              "blockNumber": 1000001n,
              "chainId": undefined,
              "from": "0x2a65aca4d5fc5b5c859090a6c34d164135398226",
              "gas": 90000n,
              "gasPrice": 50000000000n,
              "hash": "0xefb6c796269c0d1f15fdedb5496fa196eb7fb55b601c0fa527609405519fd581",
              "input": "0x",
              "nonce": 172321,
              "r": "0x98c6475188a4d0a5746b86f7ee9c61c2c9b6aaaf81f47172a14910d69292e902",
              "s": "0x32354fa0b065cea823562b2bc6ab631a61b226d42aa3995371aeb3b0a06ae45d",
              "to": "0x819f4b08e6d3baa33ba63f660baed65d2a6eb64c",
              "transactionIndex": 0,
              "type": "legacy",
              "typeHex": "0x0",
              "v": 27n,
              "value": 1048850240000000000n,
            },
          ],
          "transactionsRoot": "0xc61c50a0a2800ddc5e9984af4e6668de96aee1584179b3141f458ffa7d4ecec6",
          "uncles": [],
        },
      ]
    `);
  });
});

describe("rangeBigInt", () => {
  it("should generate a range from BigInt(1) to BigInt(5)", () => {
    expect(rangeBigInt(BigInt(1), BigInt(5))).toEqual([
      BigInt(1),
      BigInt(2),
      BigInt(3),
      BigInt(4),
      BigInt(5),
    ]);
  });

  it("should generate a range from BigInt(0) to BigInt(0)", () => {
    expect(rangeBigInt(BigInt(0), BigInt(0))).toEqual([BigInt(0)]);
  });

  it("should handle large BigInts", () => {
    expect(
      rangeBigInt(BigInt("999999999999999999"), BigInt("1000000000000000001")),
    ).toEqual([
      BigInt("999999999999999999"),
      BigInt("1000000000000000000"),
      BigInt("1000000000000000001"),
    ]);
  });

  it("should throw if end < start", () => {
    expect(() => rangeBigInt(BigInt(10), BigInt(5))).toThrow(
      "End must be greater than or equal to start",
    );
  });
});
