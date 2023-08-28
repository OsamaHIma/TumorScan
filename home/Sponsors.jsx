"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { companiesSliderSittings } from "@/constants";
import Image from "next/image";
import "swiper/swiper.css";
import { Translate } from "translate-easy";
import { TypingText } from "@/components/TypingText";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motion";

const Sponsors = () => {
  const images = [
    "/Artboard-4.png",
    "/365sportat.png",
    "/Artboard.png",
    "/cargocab.png",
    "/zino-tech-logo-768x319.png",
    "/logodown.png",
    "/nspo.png",
    "/asperologo-768x839.png",
    "/Artboard-41.png",
  ];

  SwiperCore.use([Autoplay]);

  return (
    <motion.section variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }} className="py-16" dir="ltr">
      <TypingText title="| SPONSORS" textStyles="text-center" />
      <h1 className="dark:text-white text-stone-500 font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px] my-8 text-center"><Translate>OUR SPONSORS</Translate></h1>
      <div className="relative">
        <Swiper
          className="pt-8"
          {...companiesSliderSittings}
          // slidesPerView={4}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-grab active:cursor-grabbing">
              <Image
                src={image}
                alt="company"
                className="scale-75 opacity-50 grayscale transition-all duration-500 ease-in-out hover:scale-100 hover:cursor-pointer hover:opacity-100 hover:grayscale-0"
                width={137}
                height={137}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <SwiperButtons /> */}
      </div>
    </motion.section>
  );
};

export default Sponsors;
