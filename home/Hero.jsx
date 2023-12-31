"use client";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import BrainCanvas from "./BrainCanvas";
import { Search, User, Check, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

import { Translate } from "translate-easy";
import { textVariant } from "@/utils/motion";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className=" bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
      <header className="hero-wrapper relative z-10 pb-8 pt-20 md:pt-32 text-stone-800 transition-all ease-in dark:text-stone-100">
        <div className="bg-gradient-to-t from-stone-200 to-transparent dark:from-primary-black w-full h-full absolute bottom-0 left-0 -z-10"></div>
        <div className="static-shape background-shape-main -z-1 absolute" />

        <div className="paddings innerWidth grid grid-cols-1 !items-end gap-11 md:grid-cols-2">
          <div className="hero-left flexColStart order-last flex flex-col gap-12 md:order-first ">
            <div className="hero-title relative z-[1]">
              {scrollPosition > 100 && (
                <motion.div
                  className="fixed bottom-[9rem] right-4"
                  initial={{ x: "3rem", opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, type: "tween" }}
                  viewport={{ once: true }}
                >
                  <Button
                    className="rounded-full bg-indigo-500 p-2 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={handleScrollToTop}
                  >
                    <ArrowUp size={28} />
                  </Button>
                </motion.div>
              )}

              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.7, type: "spring", delay: 0.1 }}
                className="text-2xl md:text-5xl whitespace-nowrap text-white md:dark:text-gray-300 font-semibold leading-[3rem]"
              >
                <Translate>Empowering Detection of</Translate>
              </motion.h1>
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.7, type: "spring", delay: 0.7 }}
                className="text-[4.8rem] text-white font-semibold leading-[4rem] mt-2"
              >
                <span className="md:text-indigo-500 rtl:text-indigo-50 text-indigo-50">
                  <Translate>Cancer</Translate>
                </span>{" "}
                <Translate>and</Translate>{" "}
                <span className="text-orange-400">
                  <Translate>Tumor</Translate>
                </span>
              </motion.h1>
            </div>

            <div className="hero-desc flexColStart">
              <motion.span
                variants={textVariant()}
                initial="hidden"
                whileInView="show"
                className="text-stone-300 md:text-gray-400 rtl:text-stone-200 rtl:text-right "
              >
                <Translate>Advanced Technology for Precise</Translate>
              </motion.span>
              <motion.span
                variants={textVariant(0.5)}
                initial="hidden"
                whileInView="show"
                className="text-stone-300 md:text-gray-400 rtl:text-stone-200 rtl:text-right "
              >
                <Translate>Diagnosis and Treatment.</Translate>
              </motion.span>
            </div>
            <div className="status flexCenter w-ful justify-between gap-5 md:gap-8 mx-auto md:mx-0">
              <div className="flexColCenter stat !gap-2">
                <User className="text-orange-400 md:text-indigo-500 rtl:text-orange-400" />
                <span>
                  <CountUp
                    start={2}
                    end={600}
                    duration={7}
                    className="text-4xl font-semibold rtl:text-stone-200 text-stone-200 md:text-stone-700 dark:text-gray-100"
                  />
                  <span className="ml-2 text-3xl font-bold text-[orange]">
                    +
                  </span>
                </span>
                <p className="text-stone-300 md:text-gray-400 rtl:text-stone-200 rtl:text-right">
                  <Translate>Patients</Translate>
                </p>
              </div>

              <div className="flexColCenter stat !gap-2">
                <Check className="text-orange-400 md:text-indigo-500 rtl:text-orange-400" />
                <span>
                  <CountUp
                    start={0}
                    end={97}
                    duration={7}
                    className="text-4xl font-semibold rtl:text-stone-200 text-stone-200 md:text-stone-700 dark:text-gray-100"
                  />
                  <span className="text-4xl font-semibold rtl:text-stone-200 text-stone-200 md:text-stone-700 dark:text-gray-100">
                    %
                  </span>
                  <span className="ml-2 text-3xl font-bold text-orange-500">
                    +
                  </span>
                </span>
                <p className="text-stone-300 md:text-gray-400 rtl:text-stone-200 rtl:text-right">
                  <Translate>Accurate Result</Translate>
                </p>
              </div>

              <div className="flexColCenter stat !gap-2">
                <Search className="text-orange-400 md:text-indigo-500 rtl:text-orange-400" />
                <span>
                  <CountUp
                    start={0}
                    end={340}
                    duration={7}
                    className="text-4xl font-semibold rtl:text-stone-200 text-stone-200 md:text-stone-700 dark:text-gray-100"
                  />
                  <span className="ml-2 text-3xl font-bold text-orange-500">
                    +
                  </span>
                </span>
                <p className="text-stone-300 md:text-gray-400 rtl:text-stone-200 rtl:text-right">
                  <Translate>Scans</Translate>
                </p>
              </div>
            </div>
          </div>
          <motion.div
            className="hero-right min-h-[21rem] hidden md:block z-[5] order-first h-full w-full md:order-last"
            initial={{ x: "3rem", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "tween", delay: 0.5 }}
            viewport={{ once: true }}
          >
            <BrainCanvas />
          </motion.div>
        </div>
      </header>
    </section>
  );
};

export default Hero;
