"use client";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { Moon, Sun, Laptop, MenuIcon, Mail, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// h- stands for header-
const Navbar = () => {
  const { setTheme } = useTheme();
  const [showThemeMenu, setThemeMenu] = useState("-top-[400px]");
  const [showMenu, setMenu] = useState("-right-[400px]");
  const [scrolled, setScrolled] = useState(false);
  // theme Menu toggler button
  const openThemeMenu = () => {
    if (showMenu === "right-0") {
      setMenu("-right-[400px]");
    }

    if (showThemeMenu === "top-[20%]") {
      setThemeMenu("-top-[400px]");
    } else {
      setThemeMenu("top-[20%]");
    }
  };
  // Menu toggler button
  const openMenu = () => {
    if (showThemeMenu === "top-[20%]") {
      setThemeMenu("-top-[400px]");
    }

    if (showMenu === "right-0") {
      setMenu("-right-[400px]");
    } else {
      setMenu("right-0");
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
  return (
    <nav
      className={` ${
        scrolled && " bg-gray-400/50 backdrop-blur-md"
      } h-wrapper fixed top-0 z-20 w-full text-stone-100 transition-all ease-in`}
    >
      <motion.div
        initial={{ y: "-2rem", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        viewport={{ once: true }}
        className="h-container flexCenter paddings innerWidth relative !justify-between border-b-[3px] border-stone-300 !py-2 dark:border-stone-700"
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <img src="/logo.svg" className="w-[300px]" alt="logo"  />
          </Link>
        </div>
        <section className="flexCenter relative">
          {/* Theme menu */}
          <button className="mr-5" onClick={openThemeMenu}>
            <Moon className="hidden rotate-90 transition-all dark:hover:text-blue-300 dark:block dark:rotate-0 dark:text-stone-100 dark:saturate-100" />
            <Sun className="block rotate-0 transition-all hover:text-orange-300 dark:hidden dark:rotate-90 dark:text-stone-100" />
            <span className="sr-only">Toggle theme menu</span>
          </button>

          <ul
            dir="ltr"
            className={`${showThemeMenu} menuTransition absolute right-[30%] z-50 m-8 flex w-[9rem] select-none flex-col gap-3 rounded-md bg-indigo-500 shadow-lg md:right-[60%]`}
          >
            <li
              className="cursor-pointer rounded-t-md px-8 pb-2 pt-4 text-stone-100 transition-all ease-in-out hover:bg-indigo-600 hover:text-gray-300 active:!bg-indigo-500"
              onClick={() => setTheme("dark")}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </li>
            <li
              className="cursor-pointer py-2 pl-8 text-stone-100 transition-all ease-in-out hover:bg-indigo-600 hover:text-gray-300 active:!bg-indigo-500"
              onClick={() => setTheme("light")}
            >
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </li>
            <li
              className="cursor-pointer rounded-b-md pb-4 pl-8 pt-2 text-stone-100 transition-all ease-in-out hover:bg-indigo-600 hover:text-gray-300 active:!bg-indigo-500"
              onClick={() => setTheme("system")}
            >
              <Laptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </li>
          </ul>

          {/* for large screens */}
          <div className="hidden lg:block">
            <ul className="h-menu flexCenter !gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={`${link.id}`}>{link.name}</Link>
                </li>
              ))}
              <button
                type="button"
                className="btn translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
              >
                <Link href="/contact">Sign Up</Link>
              </button>
            </ul>
          </div>
          {/* for medium and small screens */}

          <button className="mx-4 block lg:hidden" onClick={openMenu}>
            <MenuIcon className="hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <ul
            className={`menuTransition flex font-medium lg:hidden ${showMenu} absolute top-[27%] !z-[100] m-8 w-[15rem] flex-col rounded-lg bg-stone-100 dark:bg-stone-900 p-8 shadow-lg`}
          >
            {navLinks.map((link, index) => (
              <li key={index} className="my-3">
                <Link href={`${link.id}`} className="text-stone-900 dark:text-stone-100">{link.name}</Link>
              </li>
            ))}
            <button
              type="button"
              className="btn translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
            >
              <Link href="/contact">Sign Up</Link>
            </button>
          </ul>
        </section>
      </motion.div>
    </nav>
  );
};

export default Navbar;
