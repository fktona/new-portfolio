"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { containerVariants, textyVariants } from "../../libs/animation";
import { LayoutGrid } from "lucide-react";

const frontendStack = [
  { name: "React", icon: "/stack/react.png" },
  { name: "Next.js", icon: "/stack/nextjs.png" },
  { name: "Tailwind CSS", icon: "/stack/tailwindcss.png" },
  { name: "JavaScript", icon: "/stack/js.png" },
  { name: "TypeScript", icon: "/stack/typescript.png" },
  { name: "HTML", icon: "/stack/html.png" },
  { name: "CSS", icon: "/stack/css.png" },
  { name: "Framer Motion", icon: "/stack/framer-motion.svg" },
  { name: "Shadcn", icon: "/stack/shadcn.svg" },
];

const backendStack = [
  { name: "Node.js", icon: "/stack/nodejs.png" },
  { name: "Express", icon: "/stack/expressjs.png" },
  { name: "MongoDB", icon: "/stack/mongodb.png" },
  { name: "PostgreSQL", icon: "/stack/postgresql.svg" },
  { name: "Firebase", icon: "/stack/firebase.png" },
  { name: "Langchain", icon: "/stack/langchain.png" },
  { name: "REST API", icon: "/stack/rest.png" },
  { name: "Docker", icon: "/stack/docker.png" },
  { name: "GoogleCloud", icon: "/stack/gcp.png" },
  { name: "Python", icon: "/stack/python.png" },
];

const scrollVariants = {
  animate: (direction: number) => ({
    x: direction * -100 + "%",
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const gridVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ScrollingSkills = React.memo(
  ({
    stack,
    direction,
  }: {
    stack: typeof frontendStack;
    direction: number;
  }) => (
    <motion.ul
      variants={scrollVariants}
      animate="animate"
      exit="exit"
      custom={direction}
      className="lg:text-[35px] text-[22px] md:text-[26px] flex-row-reverse opacity-90 py-12 px-8 flex gap-x-24"
    >
      {Array(6)
        .fill(stack)
        .flat()
        .map((item, index) => (
          <li className="whitespace-nowrap flex items-center gap-4" key={index}>
            <Image
              alt={item.name}
              width={40}
              height={40}
              src={item.icon}
              className=""
            />
            {item.name}
          </li>
        ))}
    </motion.ul>
  )
);

ScrollingSkills.displayName = "ScrollingSkills";

const ScrollingText = React.memo(
  ({ text, direction }: { text: string; direction: number }) => (
    <motion.ul
      variants={scrollVariants}
      animate="animate"
      exit="exit"
      custom={direction}
      className="lg:text-[35px] px-8 text-[22px] opacity-90 py-12 flex space-x-8 font-arsenal border-white/45"
    >
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <li className="whitespace-nowrap flex items-center gap-8" key={i}>
            <div className="w-8 aspect-square overflow-visible rounded-full flex items-center justify-center border-2 opacity-75">
              <span className="w-[1020%] bg-green-900 h-2 border-y-2" />
            </div>
            {text}
          </li>
        ))}
    </motion.ul>
  )
);

ScrollingText.displayName = "ScrollingText";

const TechGrid = React.memo(
  ({ stack }: { stack: typeof frontendStack; title: string }) => (
    <motion.div
      variants={gridVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-12 px-8 "
    >
      {/* <h2 className="text-3xl font-bold mb-8">{title}</h2> */}
      <motion.ul className="grid grid-cols-3 md:grid-cols-5 gap-8">
        {stack.map((item) => (
          <motion.li
            key={item.name}
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <Image alt={item.name} width={40} height={40} src={item.icon} />
            <span className="text-sm text-center whitespace-nowrap">
              {item.name}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
);

TechGrid.displayName = "TechGrid";

export default function MyStack() {
  const [gridView, setGridView] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const isFontendInView = useInView(frontendRef, {
    margin: "0px 0px -200px 0px",
  });
  const isBackendInView = useInView(backendRef, {
    margin: "-100px 0px -200px 0px",
  });

  const toggleGridView = useCallback(() => {
    setGridView((prev) => !prev);
  }, []);

  useEffect(() => {
    if (showQuote) {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 5000); // Hide quote after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showQuote]);

  return (
    <div className="overflow-hidden relative min-h-[120svh] lg:mt-[200px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-20 sticky top-0  lg:px-[50px] px-5 overflow-hidden justify-between flex lg:my-6 items-center bg-background/80 backdrop-blur-sm"
      >
        <motion.h1
          variants={textyVariants}
          transition={{
            duration: 30,
          }}
          className="lg:text-[60px] text-[24px] font-medium"
        >
          SKILL
        </motion.h1>
        <div className="relative min-w-[30%] flex justify-end">
          <button
            className="hover:text-white/80 transition-all duration-300"
            onClick={toggleGridView}
            aria-label="Toggle grid view"
          >
            <LayoutGrid size={35} />
          </button>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              // className=" absolute top-0 w-fit bg-slate-20  right-0 mt-2 bg-primary text-primary-foreground p-2 rounded-md shadow-md"
            ></motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <hr className="w-full border border-white/60" />

      <AnimatePresence mode="wait">
        <ScrollingText
          key="frontend-text"
          text="FRONTEND DEVELOPER"
          direction={1}
        />
      </AnimatePresence>

      <div ref={frontendRef} className="bg-primaryBlue">
        <AnimatePresence mode="wait">
          {gridView || isFontendInView ? (
            <TechGrid
              key="frontend-grid"
              stack={frontendStack}
              title="Frontend Stack"
            />
          ) : (
            <ScrollingSkills
              key="frontend-scroll"
              stack={frontendStack}
              direction={-1}
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <ScrollingText
          key="backend-text"
          text="BACKEND DEVELOPER"
          direction={1}
        />
      </AnimatePresence>

      <hr className="w-full border border-white/60" />
      <div ref={backendRef}>
        <AnimatePresence mode="wait">
          {gridView || isBackendInView ? (
            <TechGrid
              key="backend-grid"
              stack={backendStack}
              title="Backend Stack"
            />
          ) : (
            <ScrollingSkills
              key="backend-scroll"
              stack={backendStack}
              direction={-1}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
