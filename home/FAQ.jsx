"use client";
import { staggerContainer } from "@/utils/motion";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Translate } from "translate-easy";
import { motion } from "framer-motion";
import { TitleText, TypingText } from "@/components/TypingText";
const FAQ = () => {
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      //   viewport={{ once: true }}
      className="innerWidth paddings"
    >
      <TypingText
        title="| Stupid Questions We Get All The Time"
        textStyles="text-center"
      />
      <TitleText title="FAQ" textStyles="text-center" />
      <div className="py-10">
        <Accordion
         animate={CUSTOM_ANIMATION}
          open={open === 1}
          icon={
            <ChevronDownIcon
              className={`${
                1 === open ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            />
          }
          className="mb-4"
        >
          <AccordionHeader
            className="dark:text-stone-100 dark:hover:text-gray-300"
            onClick={() => handleOpen(1)}
          >
            <Translate>What is</Translate> Tumor Scan?
          </AccordionHeader>
          <AccordionBody className="text-gray-600 dark:text-gray-300">
            <Translate>
              &quot;Tumor Scan&quot; is a cutting-edge platform that combines
              advanced imaging technology and artificial intelligence algorithms
              to provide accurate and efficient diagnosis of various types of
              cancer
            </Translate>
            .
          </AccordionBody>
        </Accordion>

        <Accordion
         animate={CUSTOM_ANIMATION}
          open={open === 2}
          icon={
            <ChevronDownIcon
              className={`${
                2 === open ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            />
          }
          className="mb-4"
        >
          <AccordionHeader
            className="dark:text-stone-100 dark:hover:text-gray-300"
            onClick={() => handleOpen(2)}
          >
            <Translate>What are the features of </Translate>Tumor Scan?
          </AccordionHeader>
          <AccordionBody>
            <h1 className="dark:text-stone-100">
              <Translate>
                &quot;Tumor Scan&quot; offers the following features:
              </Translate>
            </h1>
            <ol className="list-decimal pl-8">
              <li className="text-orange-400 my-3">
                <h3 className="font-semibold dark:text-stone-200">
                  <Translate>Advanced Imaging Technology:</Translate>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <Translate>
                    Utilizes X-ray, MRI, and CT scans to capture detailed
                    medical images for precise tumor analysis.
                  </Translate>
                </p>
              </li>
              <li className="text-orange-400 my-3">
                <h3 className="font-semibold dark:text-stone-200">
                  <Translate>AI-Powered Tumor Detection:</Translate>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <Translate>
                    Intelligent algorithms and machine learning models analyze
                    medical images to accurately identify cancerous regions and
                    tumors.
                  </Translate>
                </p>
              </li>
              <li className="text-orange-400 my-3">
                <h3 className="font-semibold dark:text-stone-200">
                  <Translate>Interactive 3D Visualization:</Translate>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <Translate>
                    Provides an immersive 3D representation of affected areas
                    for a comprehensive understanding of tumor location and
                    size.
                  </Translate>
                </p>
              </li>
            </ol>
          </AccordionBody>
        </Accordion>

        <Accordion
         animate={CUSTOM_ANIMATION}
          open={open === 3}
          icon={
            <ChevronDownIcon
              className={`${
                3 === open ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            />
          }
          className="mb-4"
        >
          <AccordionHeader
            className="dark:text-stone-100 dark:hover:text-gray-300"
            onClick={() => handleOpen(3)}
          >
            <Translate>Are there any testimonials from users?</Translate>
          </AccordionHeader>
          <AccordionBody className="stone-300 dark:stone-100">
            <h1 className="dark:text-stone-100">
              <Translate>
                Yes, here are a couple of testimonials from Tumor Scan users:
              </Translate>
            </h1>
            <ol className="list-decimal pl-8">
              <li className="text-orange-400 my-3">
                <p className="text-gray-600 text-gray-600 dark:text-gray-300">
                  <Translate>
                    &quot;I was amazed by the accuracy and speed of the tumor
                    detection service. It provided me with crucial information
                    for my treatment plan.&quot; - Customer Testimonial #1
                  </Translate>
                </p>
              </li>
              <li className="text-orange-400 my-3">
                <p className="text-gray-600 text-gray-600 dark:text-gray-300">
                  <Translate>
                    &quot;The interactive 3D visualization helped me understand
                    my diagnosis better. It made the complex information more
                    accessible and less overwhelming.&quot; - Customer
                    Testimonial #2
                  </Translate>
                </p>
              </li>
            </ol>
          </AccordionBody>
        </Accordion>
      </div>
    </motion.section>
  );
};
export default FAQ;
