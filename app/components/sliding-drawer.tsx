"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SquareArrowOutUpRight, X } from "lucide-react";

interface SlidingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: "left" | "right";
  width?: string;
}

export default function SlidingDrawer({
  isOpen,
  onClose,
  title = "Drawer",
  children,
  position = "right",
  width = "w-120",
}: SlidingDrawerProps) {
  const drawerVariants = {
    closed: { x: position === "right" ? "100%" : "-100%" },
    open: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="hide-scrollbar">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed max-w-[1440px] mx-auto mt-12 inset-0  bg-primaryBlue bg-opacity-10 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed max-w-screen-2xl    top-12 pb-12  ${position}-0 h-full ${width} bg-background shadow-lg z-50`}
          >
            <div className="fixed">
              <button
                onClick={onClose}
                className="rounded-tr-0 relative left-[-33px] top-8 z-50 hidden aspect-square w-8 items-center justify-center rounded-l-full rounded-br-full bg-white/40 hover:bg-primaryBlue/10 transition-all duration-200 lg:flex"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md bg-primaryBlue active:scale-90"
                >
                  <SquareArrowOutUpRight size={26} />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
