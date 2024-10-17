"use client";

import React, { useState, useRef } from "react";
import BlurImage from "../ui/blur-image";
import { motion, useInView } from "framer-motion";
import {
  containerVariants,
  textyVariants,
  textxVariants,
  scaleVariants,
} from "../../libs/animation";
import { projects } from "@/data/data";
import SlidingDrawer from "../sliding-drawer";
import Accordion from "../ui/Accordion";
import { useScroll } from "../../context/menuContext";
import ImageSlider from "../ui/slider";
export default function Project() {
  const { projectRef } = useScroll() as any;
  const [switchText, setSwitchText] = useState("");
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    image: string;
    description: string;
    techStack: string[];
    live: string;
    status: string;
    collectionsImg: { section: string; img: string }[];
    collectionName: string;
  } | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
  });

  const ButtonItem = {
    hidden: { y: 0, opacity: 1 },
    show: { y: -30, opacity: 1 },
    transition: {
      type: "tween",
      stiffness: 200,
      damping: 10,
      duration: 0.01,
    },
  };

  const ButtonItems2 = {
    hidden: { y: 30 },
    show: { y: 0, opacity: 1 },
    transition: {
      type: "tween",
      stiffness: 200,
      damping: 10,
      duration: 0.01,
      delay: 0.1,
    },
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  return (
    <motion.div
      ref={projectRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView && "visible"}
      className="px-4 sm:px-6 lg:px-[50px] my-12 sm:my-16 lg:my-[120px]"
    >
      <div className="w-full h-fit overflow-hidden flex flex-col sm:flex-row justify-between my-6 items-start sm:items-center">
        <motion.h1
          variants={textyVariants}
          transition={{
            duration: 30,
          }}
          className="text-3xl sm:text-4xl lg:text-[60px] font-medium mb-4 sm:mb-0"
        >
          MY WORKS
        </motion.h1>
        <p className="uppercase opacity-95 flex flex-col items-start sm:items-end text-sm sm:text-base">
          <motion.span variants={textxVariants}>
            Here are some of the
          </motion.span>
          <motion.span variants={textxVariants}> projects I have </motion.span>
          <motion.span variants={textxVariants}> worked on</motion.span>
        </p>
      </div>
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 place-items-center place-content-center"
      >
        {projects.map((project) => {
          return (
            <motion.div
              key={project.name}
              onMouseEnter={() => setSwitchText(project.name)}
              onMouseLeave={() => setSwitchText("")}
              onClick={() => handleProjectClick(project)}
              className="w-full group relative aspect-video cursor-pointer"
            >
              <div className="overflow-hidden h-fit">
                <motion.span
                  className="flex h-fit flex-col overflow-hidden"
                  variants={textyVariants}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  <motion.span
                    variants={ButtonItem}
                    animate={switchText == project.name ? "show" : "hidden"}
                    className="text-sm sm:text-base"
                  >
                    {project.name}
                  </motion.span>

                  <motion.span
                    variants={ButtonItems2}
                    animate={switchText ? "show" : "hidden"}
                    className="absolute aria-hidden text-primaryBlue hidden group-hover:block text-sm sm:text-base"
                  >
                    {project.name}
                  </motion.span>
                </motion.span>{" "}
              </div>
              <motion.div className="relative" variants={scaleVariants}>
                <div className="bg-primaryBlue/15 absolute group-hover:w-full group-hover:scale-[1.01] group-hover:h-full transition-all duration-300 z-10" />
                <BlurImage
                  alt="project"
                  src={project.image}
                  width={1920}
                  height={1080}
                  className="w-full aspect-video relative group-hover:scale-[1.01] transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <SlidingDrawer
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || "Project Details"}
        live={selectedProject?.live}
        width="w-full sm:w-96"
      >
        {selectedProject && (
          <div className="space-y-6 sm:space-y-8">
            {/* <BlurImage
              src={selectedProject.image}
              alt={selectedProject.name}
              width={400}
              height={225}
              className="w-full rounded-lg"
            /> */}

            <ImageSlider
              collectionsImg={selectedProject.collectionsImg}
              collectionName={selectedProject.collectionName}
            />

            <Accordion title="Description">
              <p className="text-muted-foreground text-sm sm:text-base">
                {selectedProject.description}
              </p>
            </Accordion>
            <div>
              <Accordion title="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Accordion>
            </div>
          </div>
        )}
        <motion.button
          onClick={() => setSelectedProject(null)}
          className="min-h-[50px] absolute  enteryButton w-[80px] md:hidden active:scale-90 isolate z-10 overflow-hidden  md:w-[180px] group  bottom-20 rounded-sm border-2 uppercase"
        >
          Close
        </motion.button>
      </SlidingDrawer>
    </motion.div>
  );
}
