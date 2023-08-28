"use client";

import { motion } from "framer-motion";
import {
  fadeIn,
  imageVariants,
  slideIn,
  staggerContainer,
} from "@/utils/motion";
import { TitleText, TypingText } from "@/components/TypingText";
import { startingFeatures } from "@/constants";
import { Translate, useLanguage } from "translate-easy";

const HowItWorks = () => {
  const { selectedLanguage } = useLanguage();
  const StartSteps = ({ number, feature }) => (
    <motion.div
      variants={slideIn("right", "spring", 0.5 * number, 1.3, selectedLanguage)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className={`flex items-center justify-center flex-row `}>
        <div
          className={`flex items-center justify-center w-[70px] h-[70px] rounded-[24px] bg-indigo-900`}
        >
          <p className="text-white text-[20px] font-bold ">0{number}</p>
        </div>
        <p className="flex-1 ltr:ml-8 rtl:mr-8 font-semibold text-xl text-gray-500 dark:text-gray-400 leading-[32px] ">
          <Translate>{feature.title}</Translate>
        </p>
      </div>
      <p className="text-gray-400 leading-[27px] mt-3">
        <Translate>{feature.text}</Translate>
      </p>
    </motion.div>
  );

  return (
    <section className={`paddings innerWidth z-10`} id="how-it-works">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={` mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={imageVariants("left",selectedLanguage)}
          
          className={`flex-1 flex items-center justify-center`}
        >
          <img
            src="/how-it-works.svg"
            alt="how it works"
            className="w-[90%] h-[90%] object-contain "
          />
        </motion.div>
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1, selectedLanguage)}
          className="flex-[0.75] flex justify-center flex-col "
          viewport={{ once: true }}
        >
          <TypingText title="| How it works" />
          <TitleText title="Get started with a few clicks" />
          <div className="flex flex-col max-w-[371px] mt-[31px] gap-6 ">
            {startingFeatures.map((feature, indx) => (
              <StartSteps key={feature} number={indx + 1} feature={feature} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
