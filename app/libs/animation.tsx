"use client";
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

export const containerVariants = {
  visible: {
    transition: {
      //   delayChildren: 1.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const textyVariants = {
  hidden: { y: 150, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "linear",
      damping: 100,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  }, // Reverse of visible
};

export const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "linear",
      damping: 100,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  }, // Reverse of visible
};

export const textxVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "linear",
      damping: 100,
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  }, // Reverse of visible
};

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
};

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  delay,
}: AnimatedTextProps) => {
  const defaultAnimation = {
    hidden: {
      opacity: 0,
      rotateY: 180, // 3D flip effect (horizontal)
    },
    visible: {
      opacity: 1,
      rotateY: 0, // Front view
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }, // You can adjust this to match your desired exit animation
    },
  };

  const words = text.split(" ");

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>

      <motion.span
        variants={{
          visible: {
            transition: { staggerChildren: 0.05, delayChildren: delay || 1 },
          },
          hidden: {},
          exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }, // Reverse the stagger on exit
        }}
        initial="hidden"
        animate="visible"
        exit="exit" // Added exit property for exiting animation
        aria-hidden
        className="flex flex-wrap"
      >
        {words.map((line, lineIndex) => (
          <span className="block perspective" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word: any, wordIndex: any) => (
              <span className="inline-block " key={`${word}-${wordIndex}`}>
                {word.split("").map((char: any, charIndex: any) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={defaultAnimation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

type AnimatedTextProps2 = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
    exit?: Variant; // Added exit variant type
  };
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    rotateY: 180, // 3D flip effect (horizontal)
    y: 0,
  },
  visible: {
    opacity: 1,
    rotateY: 0, // Front view
    y: 0,
    transition: {
      duration: 0.6, // Adjust for smoother effect
    },
  },
  exit: {
    opacity: 0,
    rotateY: -180, // Flip back when exiting
    y: 20,
    transition: {
      duration: 0.5,
    },
  },
};

export const AnimatedText2 = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  repeatDelay,
  animation = defaultAnimations,
}: AnimatedTextProps2) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        exit="exit" // Added exit animation property
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
          exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } }, // Reverse stagger for exit
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word: any, wordIndex: any) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char: any, charIndex: any) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export const headingVariants = {
  hidden: { y: 80, rotate: -30, opacity: 0 },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 2,
    },
  },
  exit: {
    y: 80,
    rotate: -90,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    }, // Reverse of visible
  },
};
