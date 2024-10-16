"use client";
import Logo from "../logo";
import { AnimatedText, textyVariants } from "../../libs/animation";
import { AnimatePresence, motion } from "framer-motion";
import { useLandingCtx } from "../../context/landingCtx";
import { useEffect } from "react";

export default function EntryPage() {
  const { setShowChildren, isPlaying, setIsPlaying } = useLandingCtx();
  useEffect(() => {
    const tt = setTimeout(() => {
      isPlaying && setShowChildren(true);
    }, 1000);
    return () => clearTimeout(tt);
  }, [isPlaying]);
  const showChildren = () => {
    setTimeout(() => {
      setShowChildren(true);
    }, 1000);
  };
  return (
    <div className="h-dvh relative w-svw flex flex-col items-center justify-center">
      <div className="flex flex-col overflow-hidden items-center">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -60 }}
          transition={{
            type: "tween",
            stiffness: 200,
            damping: 10,
            duration: 1,
            delay: 2.4,
          }}
          className="flex items-center justify-center overflow-hidden relative gap-4 mb-1"
        >
          <motion.div
            variants={textyVariants}
            initial="hidden"
            animate="visible"
          >
            <Logo className="w-12" />
          </motion.div>
          <div className="text-center text-2xl uppercase  text-white">
            <AnimatedText text="Faith's Portfolio" />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 60 }}
          transition={{
            type: "tween",
            stiffness: 200,
            damping: 10,
            duration: 1.7,
            delay: 2.4,
          }}
          className="flex items-center overflow-hidden justify-center relative gap-4 transform scale-y-[-1] opacity-10"
        >
          <motion.div
            variants={textyVariants}
            initial="hidden"
            animate="visible"
          >
            <Logo className="md:w-12 w-10" />
          </motion.div>
          <div className="text-center md:text-2xl text-md uppercase text-white">
            <AnimatedText text="Faith's Portfolio" delay={1} />
          </div>
        </motion.div>
      </div>
      <div className="overflow-hidden uppercase">
        <AnimatePresence>
          <div className="overflow-hidden text-center w-full">
            <motion.p
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{
                type: "tween",
                stiffness: 200,
                damping: 10,
                duration: 1,
                delay: 3.4,
              }}
              exit={{ y: -60 }}
            >
              Would you like to enable audio playback?
            </motion.p>
          </div>
        </AnimatePresence>
        <AnimatePresence>
          {!isPlaying && (
            <div className="flex items-center gap-4 justify-center overflow-hidden">
              <motion.button
                onClick={() => setIsPlaying(true)}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{
                  stiffness: 200,
                  damping: 10,
                  duration: 1,
                  delay: 3.4,
                }}
                exit={{ y: 80 }}
                className="min-h-[50px]  my-6 bgg w-[130px]  md:w-[180px] group  relative rounded-sm border-2 uppercase"
              >
                Abosuletly!
              </motion.button>
              <motion.button
                onClick={showChildren}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{
                  stiffness: 200,
                  damping: 10,
                  duration: 1,
                  delay: 3.4,
                }}
                exit={{ y: 80 }}
                className="min-h-[50px] bgg w-[130px]  md:w-[180px] group  relative rounded-sm border-2 uppercase"
              >
                Not Now
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
