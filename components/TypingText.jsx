"use client";

import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../utils/motion";
import { Translate } from "translate-easy";

export const TypingText = ({ title, textStyles }) => (
  
  <motion.p variants={textContainer} className={`${textStyles} text-gray-400`}>
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-stone-500 dark:text-gray-200 ${textStyles}`}
  >
    <Translate>{title}</Translate>
  </motion.h2>
);
