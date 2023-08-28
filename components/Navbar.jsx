"use client";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { Moon, Sun, Laptop, MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Translate } from "translate-easy";
import LanguageSelector from "./LanguageSelector";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { SignOutUser } from "@/lib/firebase";
import { navVariants } from "@/utils/motion";

const Navbar = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [showThemeMenu, setThemeMenu] = useState("-top-[400px]");
  const [showMenu, setMenu] = useState("ltr:-right-[400px] rtl:-left-[400px]");
  const [scrolled, setScrolled] = useState(false);
  const { token } = useUser();
  const containerRef = useRef(null);

  useEffect(() => {
    // Event listener to handle clicks outside the container
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        // Logic to close the component
        setThemeMenu("-top-[400px]");
        setMenu("ltr:-right-[400px] rtl:-left-[400px]");
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // theme Menu toggler button
  const openThemeMenu = () => {
    if (showMenu === "ltr:right-0 rtl:left-0") {
      setMenu("ltr:-right-[400px] rtl:-left-[400px]");
    }

    if (showThemeMenu === "top-[17%]") {
      setThemeMenu("-top-[400px]");
    } else {
      setThemeMenu("top-[17%]");
    }
  };

  // Menu toggler button
  const openMenu = () => {
    if (showThemeMenu === "top-[17%]") {
      setThemeMenu("-top-[400px]");
    }

    if (showMenu === "ltr:right-0 rtl:left-0") {
      setMenu("ltr:-right-[400px] rtl:-left-[400px]");
    } else {
      setMenu("ltr:right-0 rtl:left-0");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 170) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handelSignButton = () => {
    if (token) {
      SignOutUser();
    } else {
      router.push(`/auth/login`);
    }
  };
  return (
    <nav
      className={` ${
        scrolled && " bg-gray-400/50 backdrop-blur-md"
      } h-wrapper fixed top-0 z-20 w-full text-stone-100 transition-all ease-in`}
    >
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="h-container flexCenter paddings innerWidth relative !justify-between border-b-[3px] border-stone-300 !py-2 dark:border-stone-700"
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <img src="/logo.svg" className="w-32 md:w-[300px]" alt="logo" />
          </Link>
        </div>
        <section className="flexCenter relative">
          {/* Theme menu */}
          <button className="mr-5" onClick={openThemeMenu}>
            <Moon className="hidden rotate-90 transition-all dark:block dark:rotate-0 dark:text-stone-100 dark:saturate-100 dark:hover:text-blue-300" />
            <Sun className="block rotate-0 transition-all hover:text-orange-300 dark:hidden dark:rotate-90 dark:text-stone-100" />
            <span className="sr-only">Toggle theme menu</span>
          </button>
          <ul
            className={`${showThemeMenu} menuTransition absolute z-10 m-8 flex w-[9rem] select-none flex-col shadow-lg ltr:right-0 rtl:left-0 ltr:md:right-[80%] rtl:md:left-[80%]`}
            dir="ltr"
            // ref={containerRef}
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

          {/* Menu for large screens */}
          <div className="hidden lg:block">
            <ul className="h-menu flexCenter !gap-8">
              <LanguageSelector />
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={`${link.id}`}>
                    <Translate>{link.name}</Translate>
                  </Link>
                </li>
              ))}
              {token && (
                <li>
                  <Link href="/upload">
                    <Translate>Upload</Translate>
                  </Link>
                </li>
              )}
              <button
                onClick={handelSignButton}
                className="btn  translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700 w-fit "
              >
                <Translate>{token ? "Sign Out" : "Sign Up / In"}</Translate>
              </button>
            </ul>
          </div>

          {/* Menu for medium and small screens */}
          <button className="mx-4 block lg:hidden" onClick={openMenu}>
            <MenuIcon className="hover:text-slate-400 transition ease-in-out  dark:text-slate-400 dark:hover:text-slate-100" />
            <span className="sr-only">
              <Translate>Toggle menu</Translate>
            </span>
          </button>

          <ul
            className={`flex lg:hidden !text-white font-medium menuTransition ${showMenu} absolute bg-slate-200 dark:bg-slate-900 py-8 px-11 rounded-lg w-[15rem] top-[27%] z-10 flex-col m-8 shadow-lg`}
            // ref={containerRef}
          >
            <LanguageSelector />
            {navLinks.map((link, index) => (
              <li key={index} className="my-3">
                <Link
                  href={`${link.id}`}
                  className="text-stone-900 dark:text-stone-100"
                >
                  <Translate>{link.name}</Translate>
                </Link>
              </li>
            ))}
            {token && (
              <li className="my-3">
                <Link
                  href="/upload"
                  className="text-stone-900 dark:text-stone-100"
                >
                  <Translate>Upload</Translate>
                </Link>
              </li>
            )}
            <button
              onClick={handelSignButton}
              className="btn min-w-[5rem] max-w-[7rem] translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
            >
              <Translate>{token ? "Sign Out" : "Sign Up / In"}</Translate>
            </button>
          </ul>
        </section>
      </motion.div>
    </nav>
  );
};

export default Navbar;
