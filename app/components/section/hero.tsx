"use client";
import { Github, Linkedin, Mail, Plus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import {
  containerVariants,
  textyVariants,
  textxVariants,
  scaleVariants,
  AnimatedText2,
  headingVariants,
} from "../../libs/animation";
import CircularText from "../ui/circlulartext";
import { useLandingCtx } from "../../context/landingCtx";
import { useScroll } from "../../context/menuContext";

export default function Hero() {
  const { homeRef } = useScroll() as any;

  const { setShowContacts } = useLandingCtx();

  return (
    <motion.div
      ref={homeRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex lg:px-[50px] px-5  flex-col mb-[60px]   min-h-[100svh] justify-center gap-5  lg:justify-between py-24"
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 0.4,
        }}
        onClick={() => setShowContacts(true)}
        className=" md:hidden w-[200px] fixed bottom-5 aspect-square right-0 active:scale-95 transition-all duration-150 lg:top-[calc(100%-40px)] z-50  rounded-full   after:top-[10%] after:left-[10%] "
      >
        <CircularText
          text="REACH OUT. REACH OUT. REACH OUT. "
          textColor="white"
          radius={80}
          iconSize={54}
          className="absolute  right-5"
          icon={<Mail size={54} fill="white" stroke="#5700ef" />}
        />
      </motion.button>
      <div className="flex relative justify-between w-full flex-col gap-5 lg:flex-row items-end">
        <div className="relative">
          <AnimatedText2
            text="SOFTWARE DEVELOPER EST. 2021"
            className="my-2 opacity-85 text-[12px] lg:hidden"
          />
          <motion.div className="xl:text-[120px] md:text-[80px]  lg:block flex flex-wrap text-[40px] relative font-medium leading-[120%]  lg:leading-[100%]">
            <div className="overflow-hidden">
              <motion.p variants={textyVariants}>TURNING IDEAS</motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p variants={textyVariants}>INTO REALITY</motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2,
                duration: 0.4,
              }}
              onClick={() => setShowContacts(true)}
              className="after:bg-black lg:absolute pointer-events-none lg:pointer-events-auto lg:left-[calc(50%-70px)] active:scale-95 transition-all duration-150 lg:top-[calc(100%-40px)] z-50 after:rounded-full after:blur-3xl after:-z-10 after:w-[80%] after:h-[80%] after:absolute rounded-full   after:top-[10%] after:left-[10%] "
            >
              <CircularText
                text="REACH OUT. REACH OUT. REACH OUT. "
                textColor="white"
                radius={80}
                iconSize={54}
                className="hidden"
                icon={<Mail size={54} fill="white" stroke="#5700ef" />}
              />
            </motion.button>
          </motion.div>
          <div className="absolute w-[30%] top-0 h-full z-20 bg-black/75 blur-[60px] hover:translate-x-11 duration-300 transition-all" />
          <div className="absolute w-[40%] right-0 h-full bg-black/75 top-0 blur-[60px]" />
        </div>
        <motion.p className="text-end flex flex-col text-[12px] opacity-85">
          <motion.span variants={textxVariants}>
            DEVELOPER WITH A PASSION
          </motion.span>
          <motion.span variants={textxVariants}>
            FOR CREATING INTUITIVE
          </motion.span>
          <motion.span variants={textxVariants}>
            DIGITAL EXPERIENCES
          </motion.span>
        </motion.p>
        {/* <button className=" rounded-full w-[100px]  aspect-square bg-primaryBlue absolute"></button> */}
      </div>
      <AnimatedText2
        text="SOFTWARE DEVELOPER EST. 2021"
        className="my-2 xl:text-[20px] text-[12px] opacity-85 hidden lg:block"
      />
      <motion.div className="lg:flex lg:justify-between justify-center mt-5  items-end w-full relative">
        <motion.ul
          variants={headingVariants}
          className="lg:flex opacity-70 hidden  text-[75px] gap-7 font-normal"
        >
          <li className="text-center flex items-end justify-start  relative">
            <span className="leading-[50px]">3</span>
            <Plus
              className="absolute -top-4 left-[34px] font-bold"
              color="#4c00cf"
            />
            <span className="text-[30px] mr-2">YEARS</span>

            <span className="uppercase text-[30px]">experience</span>
          </li>
        </motion.ul>
        <div className="flex lg:justify-end -space-x-3  justify-center opacity-85   items-end">
          <a href={"https://github.com/fktona"} target="_blank">
            <motion.button
              variants={scaleVariants}
              className="w-[75px] aspect-square rounded-full border-2 flex justify-center items-center"
            >
              <Github />
            </motion.button>
          </a>
          <a href={"https://www.linkedin.com/in/fktona"}>
            <motion.button
              variants={scaleVariants}
              className="w-[75px] aspect-square rounded-full border-2 flex justify-center items-center"
            >
              <Linkedin />
            </motion.button>
          </a>
          <a href="mailto:adetona.fk@gmail.com">
            <motion.button
              variants={scaleVariants}
              className="w-[75px] aspect-square rounded-full border-2 flex justify-center items-center"
            >
              <Mail />
            </motion.button>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
