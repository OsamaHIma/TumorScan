"use client";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { aboutUsCards } from "@/constants";

const ServiceCard = ({ index, title, icon, image, description }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: index * 0.5, type: "tween" }}
      viewport={{ once: true }}
      className={`my-5 flex flex-col items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }  h- gap-8 rounded-md border-b-2 border-gray-300 px-3 py-2 shadow-xl dark:border-gray-500 md:items-start`}
    >
      <Tilt
        className={`w-full transition-all md:w-1/2`}
        glareEnable={true}
        glareBorderRadius="20px"
        glareColor="#5d56e0"
      >
        <img
          src={image}
          alt={title}
          className="mt-3 w-full rounded-[20px] object-contain"
        />
      </Tilt>
      <div className="my-auto flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-indigo-200 px-3 py-5 dark:bg-indigo-800 md:w-1/2 md:px-8 md:py-2">
        <motion.h3
          className="text-[20px] font-bold md:text-left"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="mb-4 mt-2 text-center text-[16px] md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", delay: 0.7 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <section className="paddings innerWidth"  id="about-us">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7 }}
          viewport={{ once: true }}
         
        >
          <h1
            className={`xs:text-[40px] text-[30px] font-black text-stone-500 dark:text-white sm:text-[50px] md:text-[60px]`}
          >
            About Us
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          Welcome to{" "}
          <span className="font-semibold text-orange-400">Tumor scanner</span>,
          a cutting-edge platform dedicated to cancer detection and tumor
          analysis.
        </motion.p>
        <div className="grid grid-cols-1">
          {aboutUsCards.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              title={service.title}
              // icon={service.icon}
              image={service.image}
              description={service.description}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
