import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getOptionalUserId } from "@/lib/auth";
import { getClerkSetupMessage, isClerkConfigured } from "@/lib/clerk";

export default async function SignInPage() {
  const userId = await getOptionalUserId();
  const clerkConfigured = isClerkConfigured();

  if (userId) {
    redirect("/dashboard");
  }

  if (!clerkConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8">
        <div className="glass-panel max-w-lg rounded-4xl border border-border/80 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.12)]">
          <h1 className="text-2xl font-semibold">Auth is disabled on this deployment.</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {getClerkSetupMessage()}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border border-border bg-card-strong px-5 py-2 text-sm font-semibold transition hover:bg-white"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8">
      <div className="glass-panel rounded-4xl border border-border/80 p-4 shadow-[0_20px_60px_rgba(16,19,35,0.12)]">
        <SignIn fallbackRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}