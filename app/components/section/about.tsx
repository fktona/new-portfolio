"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMultiInView } from "../../hooks/useMultiInView";
import CircularText from "../ui/circlulartext";
import { Mail } from "lucide-react";
import { useLandingCtx } from "../../context/landingCtx";
import { useScroll } from "../../context/menuContext";

export default function About() {
  const { aboutRef } = useScroll() as any;

  const sections = [
    "I am a software developer",
    "with a passion for crafting",
    "intuitive digital experience",
    "Who is passionate about",
    "turning ideas into digital",
    "reality",
    "...",
  ];
  const { refs, views } = useMultiInView(sections);

  const containerVariants = {
    hidden: {
      y: "80%",
    },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.03, // Adjusted for a clearer stagger effect
      },
    },
    visible: {
      y: 0,
      transition: {
        staggerChildren: 0.03, // Adjusted for a clearer stagger effect
      },
    },
    exist: {
      y: "-100%",
      transition: {
        staggerChildren: 0.03, // Adjusted for a clearer stagger effect
        staggerDirection: -1, // Reverse stagger direction
      },
    },
  };

  const fullOpacityVariants = {
    hidden: { opacity: 0.3 },
    visible: { opacity: 1 },
  };
  const { setShowContacts } = useLandingCtx();
  return (
    <section ref={aboutRef} className="bg-white">
      <div className="py-[100px] relative lg:px-[50px] px-5 w-fit  mx-auto lg:text-[92px] text-[32px] font-medium font-arsenal text-black">
        <div className="font-arsenal relative text-start  uppercase leading-[100%] flex gap-2 flex-col">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2,
              duration: 0.4,
            }}
            onClick={() => setShowContacts(true)}
            className="after:bg-black/80 absolute pointer-events-none lg:pointer-events-auto left-[calc(70%-70px)] active:scale-95 transition-all duration-150 bottom-[80px] z-50 after:rounded-full after:blur-3xl after:-z-10 after:w-[80%] after:h-[80%] after:absolute rounded-full   after:top-[10%] after:left-[10%] "
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
          {sections.map((text, index) => (
            <motion.div className="overflow-hidden " key={index}>
              <AnimatePresence>
                <motion.p
                  key={index}
                  ref={refs[index]}
                  initial="hidden"
                  animate={
                    views[index] && !views[index + 1]
                      ? "animate"
                      : views[index + 1]
                      ? "visible"
                      : "hidden"
                  } // Change here
                  exit="exist"
                  variants={containerVariants}
                  transition={{ duration: 0.3 }}
                >
                  <span className="sr-only">{text}</span>
                  {text.split("").map((letter, letterIndex) => (
                    <motion.span
                      className="aria-hidden:"
                      variants={fullOpacityVariants}
                      // Change here
                      key={letterIndex}
                      transition={{ duration: 0.3 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
