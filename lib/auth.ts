import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { isClerkConfigured } from "@/lib/clerk";

export async function getOptionalUserId() {
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