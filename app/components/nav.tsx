"use client";
import { CloudDownload } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./logo";
import { cn } from "../libs/utils";
import MiniAudioPlayer from "./ui/audioControl";
import { useScroll } from "../context/menuContext";

export default function Nav({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  //
  const { homeRef, aboutRef, projectRef, contactRef, scrollToSection } =
    useScroll() as any;

  const menuItems = [
    {
      item: "Home",
      ref: homeRef,
    },
    {
      item: "About",
      ref: aboutRef,
    },
    {
      item: "Project",
      ref: projectRef,
    },
    {
      item: "Contact",
      ref: contactRef,
    },
  ];

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
      }}
      transition={{
        ease: "linear",
      }}
      className={cn(
        "flex justify-between lg:px-[50px] z-[15000] px-5 bg-black fixed max-w-screen-2xl mb-8 top-0 w-full items-center py-2",
        className
      )}
    >
      <div className="flex gap-2 items-center justify-center">
        <Logo />
        <p className="my-2 tracking-4 md:inline hidden">
          FAITH&apos;S PORTFOLIO
        </p>
      </div>
      <MiniAudioPlayer />
      <div
        className="flex flex-col relative items-end gap-1 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredItem(null);
        }}
      >
        <span className="w-6 h-[1px] bg-white transition-all duration-300 group-hover:translate-y-[0.1px]" />
        <span className="w-5 h-[1px] bg-white transition-all duration-300 group-hover:translate-y-[-2px]" />
        <span className="w-4 h-[1px] bg-white transition-all duration-300 group-hover:translate-y-[-4.5px]" />

        {/* Menu items */}
        <AnimatePresence>
          {isHovered && (
            <motion.ul
              initial={{ height: 0, width: "150px", opacity: 1 }}
              animate={{ height: "auto", width: "150px", opacity: 1 }}
              exit={{ height: 0, width: "150px", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={cn(
                "absolute top-full right-0 isolate mt-2 overflow-hidden flex  z-10 flex-col  p-4"
              )}
            >
              <div className="absolute w-full -z-10 h-full bg-black" />
              <div className="absolute w-full -z-[5] h-full bg-white/5" />
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.item}
                  onClick={() => {
                    setHoveredItem(null);
                    scrollToSection(item.ref);
                  }}
                  className={cn(
                    "flex items-center ml-3 min-h-[30px] uppercase  cursor-pointer",
                    hoveredItem === item.item && "list-disc"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem && hoveredItem !== item.item ? 0.5 : 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.5,
                    opacity: { duration: 0.2, delay: index * 0.1 },
                  }}
                  onMouseEnter={() => setHoveredItem(item.item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span>{item.item}</span>
                </motion.li>
              ))}
              <hr className="mt-3 border border-gray-700" />
              <a
                href="https://drive.google.com/file/d/11bWk0zYM7gF-0-UslM8sbYwMWgFczU6w/view?usp=sharing"
                target="_blank"
              >
                <motion.button
                  className="flex items-center ml-3 min-h-[30px] space-x-2  cursor-pointer active:scale-95"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: hoveredItem && hoveredItem !== "Resume" ? 0.5 : 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4,
                    opacity: { duration: 0.2 },
                  }}
                  onMouseEnter={() => setHoveredItem("Resume")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <CloudDownload size={16} />
                  <span>Resume</span>
                </motion.button>
              </a>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
