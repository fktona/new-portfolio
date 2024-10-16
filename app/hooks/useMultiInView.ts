"use client";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Custom hook to manage multiple refs and visibility
export function useMultiInView(items: string[]) {
  const refs = items.map(() => useRef(null));
  const views = refs.map((ref) =>
    useInView(ref, { margin: "-20px 0px -50px 0px" })
  );

  return { refs, views };
}
