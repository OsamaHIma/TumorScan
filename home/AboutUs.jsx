"use client";

import { TitleText, TypingText } from "@/components/TypingText";
import { fadeIn, imageVariants, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { Translate, useLanguage } from "translate-easy";

const WhatsNew = () => {
  const { selectedLanguage } = useLanguage();
  return (
    <section className={`innerWidth p-7 z-10`} id="about-us">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={` mx-auto flex lg:flex-row  flex-col-reverse gap-8`}
      >
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1, selectedLanguage)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title="| About Tumor Scan" />
          <TitleText title={`About Us`} />
          <p className="text-sm text-gray-500 dark:text-gray-300 leading-7">
            <Translate>
              We leverage state-of-the-art imaging technology and advanced
              algorithms to provide accurate and efficient diagnosis of various
              types of cancer, including brain tumors, lung cancer, and more
            </Translate>
            .
          </p>
        </motion.div>
        <motion.div
          variants={imageVariants("right", selectedLanguage)}
          className={`flex-1 flex justify-center items-center`}
        >
          <Image
            src="/about-us.svg"
            width={300}
            height={300}
            alt="whats-new"
            className="w-full object-cover "
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhatsNew;
