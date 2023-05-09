import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import Link from "next/link";

export default function UnauthorizedPage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 3000);
  });

  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-indigo-600">403</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            FORBIDDEN!
          </h1>
          <p className="mt-6 text-2xl  sm:text-xl leading-7 text-gray-600">
            Sorry, we couldn’t provid the page you were looking for. because you
            dont’t have access.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
