import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { isClerkConfigured } from "@/lib/clerk";

const LOCAL_DEMO_USER_ID = "local-dev-demo-user";

export function isLocalDevelopmentAuthFallbackEnabled() {
  return process.env.NODE_ENV !== "production" && !isClerkConfigured();
}

export async function getOptionalUserId() {
  if (isLocalDevelopmentAuthFallbackEnabled()) {
    return LOCAL_DEMO_USER_ID;
  }

  if (!isClerkConfigured()) {
    return null;
  }

  const session = await auth();

  return session.userId ?? null;
}

export async function requireUser() {
  const userId = await getOptionalUserId();

  if (!userId) {
    redirect(isClerkConfigured() ? "/sign-in" : "/");
  }

  return userId;
}