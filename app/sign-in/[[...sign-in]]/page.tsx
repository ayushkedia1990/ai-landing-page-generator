import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-8">
      <div className="glass-panel rounded-4xl border border-border/80 p-4 shadow-[0_20px_60px_rgba(16,19,35,0.12)]">
        <SignIn fallbackRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}