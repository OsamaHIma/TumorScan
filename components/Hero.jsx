"use client";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import PhoneCanvas from "./PhoneCanvas";
import BrainCanvas from "./BrainCanvas";
import { Search, User, Users, Check, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

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
    <header className="hero-wrapper relative z-10 pb-8 pt-32 text-stone-800 transition-all ease-in dark:text-stone-100">
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
                <button
                  className="rounded-full bg-indigo-500 p-2 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={handleScrollToTop}
                >
                  <ArrowUp size={28} />
                </button>
              </motion.div>
            )}

            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="text-[3.8rem] font-semibold leading-[4rem] "
              color=""
            >
              Empowering Cancer Detection and Tumor Analysis
            </motion.h1>
          </div>

          <div className="hero-desc flexColStart">
            <span className="text-light-gray">
              Advanced Technology for Precise
            </span>
            <span className="text-light-gray">Diagnosis and Treatment</span>
          </div>
          <div className="status flexCenter w-ful justify-between gap-8">
            <div className="flexColCenter stat !gap-2">
              <User className="text-indigo-500" />
              <span>
                <CountUp
                  start={2}
                  end={600}
                  duration={4}
                  className="text-4xl font-semibold text-stone-700 dark:text-gray-100"
                />
                <span className="ml-2 text-3xl font-bold text-[orange]">+</span>
              </span>
              <p className="text-light-gray">Patients</p>
            </div>
            {/* 
            <div className="flexColCenter stat !gap-2">
              <Users className="text-indigo-500" />
              <span>
                <CountUp
                  start={0}
                  end={40}
                  duration={4}
                  className="text-4xl font-semibold text-stone-700 dark:text-gray-100"
                />
                <span className="ml-2 text-3xl font-bold text-[#ffaa49]">
                  +
                </span>
              </span>
              <p className="text-light-gray">Team Members</p>
            </div> */}

            <div className="flexColCenter stat !gap-2">
              <Check className="text-indigo-500" />
              <span>
                <CountUp
                  start={0}
                  end={97}
                  duration={4}
                  className="text-4xl font-semibold text-stone-700 dark:text-gray-100"
                />
                <span className="text-4xl font-semibold text-stone-700 dark:text-gray-100">
                  %
                </span>
                <span className="ml-2 text-3xl font-bold text-dark-orange">
                  +
                </span>
              </span>
              <p className="text-light-gray">Accurate Result</p>
            </div>

            <div className="flexColCenter stat !gap-2">
              <Search className="text-indigo-500" />
              <span>
                <CountUp
                  start={0}
                  end={340}
                  duration={4}
                  className="text-4xl font-semibold text-stone-700 dark:text-gray-100"
                />
                <span className="ml-2 text-3xl font-bold text-dark-orange">
                  +
                </span>
              </span>
              <p className="text-light-gray">Scans</p>
            </div>
          </div>
        </div>
        <motion.div
          className="hero-right z-[5] order-first h-full w-full md:order-last"
          initial={{ x: "3rem", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "tween", delay: 0.5 }}
          viewport={{ once: true }}
        >
          <BrainCanvas />
        </motion.div>
      </div>
      {/* <PhoneCanvas /> */}
    </header>
  );
};

export default Hero;
