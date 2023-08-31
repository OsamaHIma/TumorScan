"use client";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Translate } from "translate-easy";
import LanguageSelector from "./LanguageSelector";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { SignOutUser } from "@/lib/firebase";
import { navVariants } from "@/utils/motion";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const { token } = useUser();

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
        scrolled && " bg-stone-400/50 backdrop-blur-md"
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
            <Image
              src="/logo.svg"
              width={300}
              height={300}
              priority
              className="w-32 md:w-[300px]"
              alt="logo"
            />
          </Link>
        </div>
        <section className="flexCenter relative">
          {/* Theme menu */}
          <ThemeSelector />
          {/* Menu for large screens */}
          <div className="hidden lg:block">
            <ul className="h-menu flexCenter !gap-8">
              <LanguageSelector />
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={`${link.id}`} className="text-stone-50">
                    <Translate>{link.name}</Translate>
                  </Link>
                </li>
              ))}
              {token && (
                <li>
                  <Link href="/upload" className="text-stone-50">
                    <Translate>Upload</Translate>
                  </Link>
                </li>
              )}
              <Button
                onClick={handelSignButton}
                className="py-4 bg-indigo-600 text-slate-100 w-fit"
              >
                <Translate>{token ? "Sign Out" : "Sign Up / In"}</Translate>
              </Button>
            </ul>
          </div>

          {/* Menu for medium and small screens */}

          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            
          >
            <MenuHandler>
              <IconButton  variant="text" className="mx-4 block rounded-full lg:hidden">
                <MenuIcon className="hover:text-slate-400 transition ease-in-out  text-slate-300 dark:hover:text-slate-100" />
                <span className="sr-only">
                  <Translate>Toggle menu</Translate>
                </span>
              </IconButton>
            </MenuHandler>

            <MenuList className="dark:bg-stone-900 border-0 lg:hidden mx-5">
              <LanguageSelector />
              {navLinks.map((link, index) => (
                <MenuItem key={index} className=" dark:hover:bg-stone-700 my-3">
                  <Link
                    href={`${link.id}`}
                    className="text-stone-900 dark:text-stone-400"
                  >
                    <Translate>{link.name}</Translate>
                  </Link>
                </MenuItem>
              ))}
              {token && (
                <MenuItem className=" dark:hover:bg-stone-700 my-3">
                  <Link
                    href="/upload"
                    className="text-stone-900 dark:text-stone-400"
                  >
                    <Translate>Upload</Translate>
                  </Link>
                </MenuItem>
              )}
              <Button
                onClick={handelSignButton}
                className=" min-w-[5rem] max-w-[7rem] translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
              >
                <Translate>{token ? "Sign Out" : "Sign Up / In"}</Translate>
              </Button>
            </MenuList>
          </Menu>
        </section>
      </motion.div>
    </nav>
  );
};

export default Navbar;
