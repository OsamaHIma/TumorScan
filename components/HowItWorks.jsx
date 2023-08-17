"use client";
import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Translate } from "translate-easy";

const images = [
  // Replace these with your own images
  "/x-ray.jpg",
  "pc.jpg",
  "/brain.jpeg",
];

// Define a custom component for each step
const Step = ({ title, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: index * 0.7 }}
      viewport={{ once: true }}
    >
      <Tilt
        className="bg-stone-150 flex flex-col  items-center justify-center rounded-[20px] p-8 shadow-lg"
        glareEnable={true}
        glareBorderRadius="20px"
        glareColor="#5d56e0"
      >
        <motion.img
          src={image}
          alt={title}
          className="mb-4 h-full w-full rounded-lg object-cover"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        />

        <div className="text-center md:text-left">
          <h3 className={`text-2xl font-bold text-indigo-500`}>
            <span className="text-3xl font-bold text-orange-400">
              {index + 1}.{" "}
            </span>
            <Translate>{title}</Translate>
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-400"><Translate>{description}</Translate></p>
        </div>
      </Tilt>
    </motion.div>
  );
};

// Define the main component for the section
const HowItWorks = () => {
  // Define an array of objects for each step
  const steps = [
    {
      title: "Upload Your Medical Image",
      description:
        "Provide your medical image, such as an X-ray or MRI scan, securely through our user-friendly interface.",
    },
    {
      title: "Tumor Analysis and Detection",
      description:
        "Our advanced algorithms analyze the image, precisely detecting cancerous regions and identifying tumor characteristics.",
    },
    {
      title: "Receive Detailed Reports",
      description:
        "Get comprehensive reports with valuable insights about tumor location, size, and recommended treatment options.",
    },
  ];

  return (
    <div className="container px-4 py-16" id="how-it-works">
      <h1
        className={`xs:text-[40px] text-center text-[30px] font-black text-stone-500 dark:text-white sm:text-[50px] md:text-[60px]`}
      >
        <Translate>How It Works</Translate>
      </h1>
      <motion.div
        className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        viewport={{ once: true }}
      >
        {steps.map((step, index) => (
          <Step key={index} {...step} image={images[index]} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
