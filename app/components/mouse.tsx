"use client";

import { useState, useEffect, ReactNode } from "react";

interface BlurShadowWrapperProps {
  children: ReactNode;
}

export default function BlurShadowWrapper({
  children,
}: BlurShadowWrapperProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative z-[1000] overflow-hidden">
      <div
        className="fixed inset-0 z-[1000] bg-primaryBue/35 opacity-40 w-24 blur-3xl aspect-square pointer-events-none "
        style={{
          background: "radial-gradient(600px at 0 0, #5700ef, transparent 80%)",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
