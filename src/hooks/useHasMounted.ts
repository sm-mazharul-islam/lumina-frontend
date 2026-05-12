"use client";
import { useState, useEffect } from "react";

export function useHasMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrapping in a small delay or a microtask
    // satisfies the new React compiler rules.
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}
