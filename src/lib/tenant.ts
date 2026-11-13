import { headers } from "next/headers";

export interface TenantContext {
  orgId: string;
}

export function getTenantContext(): TenantContext | null {
  // TODO(phase-2): read from session
  try {
    const headersList = headers();
    const orgId = headersList.get("x-org-id");
    if (!orgId) {
      return null;
    }
    return { orgId };
  } catch {
    return null;
  }
}
