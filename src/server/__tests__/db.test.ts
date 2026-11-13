import { describe, it, expect } from "vitest";
import { db } from "../db";
import { PrismaClient } from "@prisma/client";

describe("db client singleton", () => {
  it("instantiates without throwing and exports PrismaClient", () => {
    expect(db).toBeDefined();
    expect(db).toBeInstanceOf(PrismaClient);
  });
});
