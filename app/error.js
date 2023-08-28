"use client";
import Link from "next/link";
import { Translate } from "translate-easy";

function Error({ errorMessage }) {
  // "use server";
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section className="relative">
      <div className="gradient absolute right-[100px] top-10 h-80 w-80 bg-indigo-600/30 blur-[100px]" />

      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            Error Code: 500
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {errorMessage}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            <Translate>
              We&apos;re sorry, but something went wrong. Please try again later
            </Translate>
            .
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={handleGoBack}
              className="bg-transaprent flex w-1/2 items-center justify-center gap-x-2 rounded-lg border px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <Link
              href="/"
              className="bg-blue-gradient w-1/2 shrink-0 rounded-lg px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:opacity-80 sm:w-auto"
            >
              <Translate translations={{ar:"عد للصفحة الرئيسية"}}>Take me home</Translate>
            </Link>
          </div>
        </div>

        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/serverError.svg"
            alt="505"
          />
        </div>
      </div>
    </section>
  );
}

export default Error;
