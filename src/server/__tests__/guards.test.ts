import { describe, it, expect, vi, beforeEach } from "vitest";
import { requireOrg, scopeToOrg } from "../guards";

vi.mock("next/headers", () => {
  return {
    headers: vi.fn(),
  };
});

import { headers } from "next/headers";

describe("requireOrg guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws 'No tenant context' when headers have no x-org-id", () => {
    const mockHeaders = new Headers();
    // justification: mock next/headers ReadonlyHeaders return type in unit test
    vi.mocked(headers).mockReturnValue(mockHeaders as unknown as ReturnType<typeof headers>);

    expect(() => requireOrg()).toThrow("No tenant context");
  });

  it("returns { orgId: 'test-org' } when x-org-id: test-org is present", () => {
    const mockHeaders = new Headers();
    mockHeaders.set("x-org-id", "test-org");
    // justification: mock next/headers ReadonlyHeaders return type in unit test
    vi.mocked(headers).mockReturnValue(mockHeaders as unknown as ReturnType<typeof headers>);

    const context = requireOrg();
    expect(context).toEqual({ orgId: "test-org" });
  });

  it("correctly scopes query to org with scopeToOrg", () => {
    const query = { isActive: true };
    const scoped = scopeToOrg(query, "test-org");
    expect(scoped).toEqual({ isActive: true, orgId: "test-org" });
  });
});
