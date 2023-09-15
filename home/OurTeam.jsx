"use client";
import { motion } from "framer-motion";
import { LinkedinIcon, FacebookIcon, PlusIcon } from "lucide-react";
import { TitleText, TypingText } from "@/components/TypingText";
import { slideIn, staggerContainer } from "@/utils/motion";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { teamMembers } from "@/constants";
import { Translate } from "translate-easy";

const TeamMember = ({ index, name, role, image, linkedin, facebook }) => {
  return (
    <motion.div
      variants={slideIn("up", "tween", 0.5 * index, 1.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="overlay absolute z-10 w-full h-72 bg-indigo-600/40 hover:bg-transparent transition-all duration-700"></div>
        <motion.img src={image} alt={name} className="h-72 rounded-lg" />
      </div>
      <Tilt
        glareEnable={true}
        glareBorderRadius="20px"
        glareColor="#5d56e0"
        className="flex flex-col items-center mt-4 p-2 whitespace-nowrap"
      >

        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
        <div className="flex gap-2 mt-2">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon className="w-6 h-6 text-gray-400 hover:text-indigo-500 transition-colors duration-300" />
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="w-6 h-6 text-gray-400 hover:text-indigo-500 transition-colors duration-300" />
          </a>
        </div>

      </Tilt>
    </motion.div>
  );
};

const JoinTeamCard = () => {
  return (
    <Tilt
      glareEnable={true}
      glareBorderRadius="20px"
      glareColor="#5d56e0"
    >
      <Link href="/contact" className="mx-auto md:mx-0">
        <motion.div
          variants={slideIn("up", "tween", 0.5 * teamMembers.length, 1.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center m-4 border-2 h-96 hover:bg-indigo-500/20 transition-all ease-out duration-500 border-dashed rounded-lg border-gray-400 dark:border-gray-300 justify-center w-[17rem] px-4"
        >
          <div className="flex flex-col items-center">
            <PlusIcon size={80} />

            <div className="flex flex-col items-center mt-4">
              <h3 className="text-lg font-bold">
                <Translate>Contribute with us!</Translate>
              </h3>
            </div>
          </div>
        </motion.div>
      </Link>
    </Tilt>
  );
};

const OurTeam = () => {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      //   viewport={{ once: true }}
      className="innerWidth paddings"
    >
      <div className="container mx-auto p-4">
        <TypingText title="| Who Creates The Magic" textStyles="text-center" />
        <TitleText title="Our Team" textStyles="text-center" />
        <div className="flex flex-wrap my-16 -mx-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} index={index} />
          ))}
          <JoinTeamCard />
        </div>
      </div>
    </motion.section>
  );
};

export default OurTeam;
