"use client";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Laptop } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import LanguageSelector from "@/components/LanguageSelector";
// import Breadcrumb from "@/components/Breadcrumb";

const Layout = ({ children }) => {
  const { setTheme } = useTheme();
  const [showThemeMenu, setThemeMenu] = useState("-top-[400px]");
  // theme Menu toggler button
  const openThemeMenu = () => {
    if (showThemeMenu === "top-[17%]") {
      setThemeMenu("-top-[400px]");
    } else {
      setThemeMenu("top-[17%]");
    }
  };
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
              <div>
                <button className="mr-5" onClick={openThemeMenu}>
                  <Moon className="hidden rotate-90 transition-all dark:block dark:rotate-0 dark:text-stone-100 dark:saturate-100 dark:hover:text-blue-300" />
                  <Sun className="block rotate-0 transition-all hover:text-orange-300 dark:hidden dark:rotate-90 dark:text-stone-100" />
                  <span className="sr-only">Toggle theme menu</span>
                </button>
                <ul
                  className={`${showThemeMenu} menuTransition absolute z-10 m-8 flex w-[9rem] select-none flex-col shadow-lg ltr:right-0 rtl:left-0 rtl:md:left-[80%]`}
                  dir="ltr"
                >
                  <li
                    className="cursor-pointer rounded-t-md px-8 pb-2 pt-4 text-stone-900 bg-stone-200 dark:text-stone-100 transition-all ease-in-out hover:!bg-indigo-600 dark:bg-stone-900 hover:text-gray-300 active:!bg-indigo-500"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </li>
                  <li
                    className="cursor-pointer py-2 pl-8 text-stone-900 bg-stone-200 dark:text-stone-100 transition-all ease-in-out hover:!bg-indigo-600 dark:bg-stone-900 hover:text-gray-300 active:!bg-indigo-500"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </li>
                  <li
                    className="cursor-pointer rounded-b-md pb-4 pl-8 pt-2 text-stone-900 bg-stone-200 dark:text-stone-100 transition-all ease-in-out hover:!bg-indigo-600 dark:bg-stone-900 hover:text-gray-300 active:!bg-indigo-500"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </li>
                </ul>
              </div>
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
