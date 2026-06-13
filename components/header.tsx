import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { getOptionalUserId } from "@/lib/auth";

export async function Header() {
  const clerkConfigured = isClerkConfigured();
  const userId = await getOptionalUserId();

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center text-[#3B82F6]">
            <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.0326 0.8424C43.5942 1.40205 43.875 2.09625 43.875 2.925V23.4C43.875 26.6309 41.2559 29.25 38.025 29.25H21.645L20.9138 32.76C20.7675 33.4425 20.4263 34.0031 19.89 34.4419C19.3538 34.8806 18.7444 35.1 18.0619 35.1H2.92501C2.09821 35.1019 1.40401 34.8221 0.842411 34.2605C0.280811 33.6989 1.14441e-05 33.0037 1.14441e-05 32.175V8.775C-0.00193787 7.9482 0.277885 7.254 0.839489 6.6924C1.40109 6.1308 2.09626 5.85 2.92501 5.85H16.38L17.1113 2.34C17.2575 1.6575 17.5988 1.09687 18.135 0.658125C18.6713 0.219375 19.2806 0 19.9631 0H40.95C41.7768 0.00195 42.471 0.28275 43.0326 0.8424Z" fill="#2B7FFF"/>
              <path d="M30.7125 21.6724C32.175 21.6724 33.5552 21.1057 34.5881 20.0728C35.1007 19.5645 35.5069 18.9591 35.7831 18.2922C36.0593 17.6252 36.2 16.9099 36.1969 16.188C36.1969 14.7438 35.6302 13.3453 34.5881 12.3124L30.7125 8.43679M25.5389 11.0236L30.7125 5.85L35.8861 11.0236C38.738 13.8755 38.738 18.5098 35.8861 21.3616C35.2071 22.0413 34.4005 22.5801 33.5127 22.9472C32.6248 23.3142 31.6732 23.5023 30.7125 23.5005C28.8387 23.5005 26.9648 22.7876 25.5389 21.3616C22.687 18.5098 22.687 13.8755 25.5389 11.0236Z" fill="white"/>
              <path d="M10.3774 26.0258L9.73991 25.4029L9.63976 16.7571L10.9002 16.7425L11.0003 25.3883L10.3774 26.0258ZM10.3979 27.7948L12.2557 25.8935L12.084 12.9802L8.34752 13.0677L8.49659 25.937L10.3979 27.7948ZM10.2701 16.7608L10.9002 16.7425L9.63976 16.7571L10.2701 16.7608Z" fill="white"/>
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#3B82F6]">PageCraft</span>
        </Link>
        <div className="h-6 w-px bg-gray-300" />
        <span className="text-sm font-medium text-gray-500">AI Landing Page Generator</span>
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
        <Link href="/templates" className="text-sm font-medium text-gray-500 hover:text-gray-900">Templates</Link>
        <Link href="/saved-pages" className="text-sm font-medium text-gray-500 hover:text-gray-900">Saved Pages</Link>
      </nav>

      <div className="flex items-center gap-4">
        {clerkConfigured ? (
          <>
            {userId ? (
              <>
                <div className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                  </svg>
                  <span>35</span>
                </div>
                <button type="button" className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                  Upgrade
                </button>
                <UserButton />
              </>
            ) : (
              <Link href="/sign-in" className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                Sign in
              </Link>
            )}
          </>
        ) : (
          <div className="rounded-md bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-500">
            Preview Mode
          </div>
        )}
      </div>
    </header>
  );
}
