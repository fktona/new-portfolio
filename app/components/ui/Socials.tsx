"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { containerVariants, scaleVariants } from "@/app/libs/animation";

const buttons = [
  { href: "https://github.com/fktona", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/fktona",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:adetona.fk@gmail.com", icon: Mail, label: "Email" },
];

const AnimatedButton = ({
  href,
  icon: Icon,
  label,
  isHovered,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isHovered: boolean;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const yOffset = isHovered
    ? -20
    : hoveredIndex !== null && index > hoveredIndex
    ? 10
    : 0;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      animate={{ y: yOffset }}
      variants={scaleVariants}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="relative"
    >
      <motion.div
        className="w-[75px] aspect-square  rounded-full border-2 flex justify-center items-center border-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 -top-10 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">{label}</span>
    </motion.a>
  );
};

export default function Socials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      className="flex lg:justify-end -space-x-3 justify-center opacity-85 items-end"
    >
      {buttons.map((button, index) => (
        <AnimatedButton
          key={button.href}
          href={button.href}
          icon={button.icon}
          label={button.label}
          isHovered={hoveredIndex === index}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </motion.div>
  );
}
