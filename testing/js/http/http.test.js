import { it, vi, expect } from "vitest";

import { sendDataRequest, HttpError } from "./http";

const testResponseData = { testKey: "testData" };

// we still create the function using fn since we want to be able to call methods like hasBeenCalledWith etc
const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      return reject("Not a string.");
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

// we cant use mock to replace fetch since its a global function not a module. Stub allows us to replace globally avaliable  objects / functions
vi.stubGlobal("fetch", testFetch);

it("should return any available response data", () => {
  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { key: "test" };

  let errorMessage;

  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }

  expect(errorMessage).not.toBe("Not a string.");
});

it("should throw an HttpError in case of non-ok responses", () => {
  // we override testFetch with a custom implementation just for this test since we need it to return ok: false in this case
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
