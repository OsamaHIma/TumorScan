"use client";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeSelector from "@/components/ThemeSelector";
// import Breadcrumb from "@/components/Breadcrumb";

const Layout = ({ children }) => {
  return (
    <div className="max-w-[1400px] mx-auto min-h-[100vh] " dir="ltr">
      <div className="flex   min-h-[100vh] ">
        <div className="w-full pt-4 mt-12">
          <div className="w-full h-auto flex flex-col justify-center items-center">
            <div className="flex gap-4 px-8 relative left-0 justify-between items-center">
              <Link
                href="/"
                className="rounded-full bg-indigo-600 px-3 py-2 dark:bg-transparent"
              >
                <Image src="/logo.svg" alt="logo" width={183} height={183} />
              </Link>
              <LanguageSelector />
              <ThemeSelector />
            </div>
            {/* <Breadcrumb className="mt-3" /> */}

            {children}
          </div>
        </div>
        <div className="hidden lg:flex min-h-[100vh] relative justify-end items-end w-full bg-indigo-500 ">
          {/* Image here when provided */}
          <Image
            src="/bg-auth.png"
            alt="worker-preveiw"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute left-0 top-0 h-full w-full"
          />
          {/* <Image
            src="/about us brain.jpg"
            alt="worker-preveiw"
            width="0"
            height="0"
            sizes="100vw"
            className="w-[90%] h-[750px] z-20 "
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
