import { getTenantContext, TenantContext } from "@/lib/tenant";

export function requireOrg(): TenantContext {
  const context = getTenantContext();
  if (!context || !context.orgId) {
    throw new Error("No tenant context");
  }
  return context;
}

export function scopeToOrg<T extends Record<string, unknown>>(
  query: T,
  orgId: string
): T & { orgId: string } {
  return {
    ...query,
    orgId,
  };
}
