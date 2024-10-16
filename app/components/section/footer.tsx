"use client";
import React from "react";
import { motion } from "framer-motion";
import CircularText from "../ui/circlulartext";
import { Mail } from "lucide-react";
import { useLandingCtx } from "../../context/landingCtx";
import { useScroll } from "../../context/menuContext";
export default function Footer() {
  const { setShowContacts } = useLandingCtx();

  const { contactRef } = useScroll() as any;

  return (
    <div
      ref={contactRef}
      className="lg:mt-[150px] relative px-[50px] min-h-[50svh] lg:min-h-[80vh] items-center flex lg:flex-col justify-center   lg:justify-between w-full"
    >
      <h1 className="lg:text-[140px] text-[40px] font-medium text-center leading-[100%]">
        START YOUR <br /> PROJECT
      </h1>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 0.4,
        }}
        onClick={() => setShowContacts(true)}
        className="after:bg-black lg:absolute pointer-events-none lg:pointer-events-auto left-[calc(50%-70px)] active:scale-95 transition-all duration-150 top-[200px] z-50 after:rounded-full after:blur-3xl after:-z-10 after:w-[80%] after:h-[80%] after:absolute rounded-full after:top-[10%] after:left-[10%]"
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
    </div>
  );
}
