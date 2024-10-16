"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/libs/utils";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Accordion({
  title,
  children,
  className,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("overflow-hidden border-b", className)}>
      <motion.button
        className="flex w-full items-center justify-between  px-4 py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
        whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="h-6 w-6 text-gray-500" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{
                collapsed: { opacity: 0, y: -10 },
                open: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className=" p-4"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
