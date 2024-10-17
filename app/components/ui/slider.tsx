import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import BlurImage from "./blur-image";

export default function ImageSlider({
  collectionsImg,
  collectionName,
}: {
  collectionsImg: {
    section: string;
    img: string;
  }[];
  collectionName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeInterval, setTimeIntervel] = useState(5000);

  // Auto change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % collectionsImg.length);
    }, timeInterval); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [collectionsImg.length]);

  // Variants for smooth transition
  const imageVariants = {
    initial: { opacity: 0, x: 100 }, // Starting state (off-screen to the right)
    animate: { opacity: 1, x: 0, transition: { duration: 1 } }, // Fade in and slide in
    exit: { opacity: 0, x: -100, transition: { duration: 1 } }, // Fade out and slide out to the left
  };

  const nameVariants = {
    initial: {
      opacity: 0,
      y: 30, // Start below
    },
    animate: {
      opacity: 1,
      y: 0, // Move to its original position
      transition: { duration: 1 },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 1 },
    },
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setTimeIntervel(5000);
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        {collectionsImg.map((img, index) =>
          index === currentIndex ? (
            <>
              <motion.div
                key={index + img.img}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <BlurImage
                  src={`/${collectionName}/${img.img}.png`}
                  alt="project"
                  width={400}
                  height={225}
                  className="w-full rounded-lg"
                />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,

                    transition: { duration: 0.3 },
                  },
                  exit: {
                    opacity: 0,

                    transition: { duration: 1 },
                  },
                }}
                key={index + img.img + "name"}
                className="text-sm font-semibold overflow-hidden capitalize z-40 left-4 bg-black rounded-lg absolute top-4 px-2 py-1 text-light-accent"
              >
                <motion.p
                  className="overflow-hidden "
                  variants={nameVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {img.section}
                </motion.p>
              </motion.div>
            </>
          ) : null
        )}
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {collectionsImg.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-4 h-1 rounded-sm transition-all duration-300 ${
              currentIndex === index ? "bg-primaryBlue" : "bg-primaryBlue/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
