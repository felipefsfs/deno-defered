import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { defered, w } from "./mod.js";

Deno.test("w function", async function () {
  const v = w(10, "x");
  assertEquals(await v, "x");
});

Deno.test("defered resolve", async function () {
  const d = defered(100);
  x(d);
  assertEquals(await d.p, "x");
  async function x(def) {
    await w(10);
    def.resolve("x");
  }
});

Deno.test("defered isFinished", async function () {
  const d = defered(100);
  assertEquals(await d.isFinished(), false);
  d.resolve();
  assertEquals(await d.isFinished(), true);
});

Deno.test("defered reject", async function () {
  const d = defered(5);
  assertThrowsAsync(() => d.p, Error, "Defered object Timeout");
  await w(10);
});

Deno.test("defered reject", async function () {
  const d = defered(100);
  await w(10);
  d.reject(new Error("Test Reject"));
  assertThrowsAsync(() => d.p, Error, "Test Reject");
});
