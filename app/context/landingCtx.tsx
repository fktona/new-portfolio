"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import EntryPage from "../components/ui/Entery";

const LandingContext = createContext<any>(null);

export default function LandingProvider({ children }: { children: ReactNode }) {
  const [showChildren, setShowChildren] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Control audio playback based on isPlaying state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <LandingContext.Provider
      value={{
        showChildren,
        setShowChildren,
        setShowContacts,
        showContacts,
        isPlaying,
        setIsPlaying,
      }}
    >
      <audio ref={audioRef} src="/pure.mp3" loop />
      <AnimatePresence>
        {!showChildren ? (
          <motion.div className="overflow-hidden">
            <EntryPage />
          </motion.div>
        ) : (
          <motion.div>{children}</motion.div>
        )}
      </AnimatePresence>
    </LandingContext.Provider>
  );
}

export const useLandingCtx = () => useContext(LandingContext);
