"use client";

import { useState } from "react";
import RevealLoader from "@/components/ui/reveal-loader";

export default function PageLoader() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <RevealLoader
      text="TECHBLITZ 2026"
      textSize="clamp(4rem, 12vw, 15rem)"
      textColor="white"
      bgColors={["hsla(0, 0%, 7%, 1.00)", "hsla(350, 53%, 36%, 1.00)"]}
      angle={45}
      staggerOrder="center-out"
      movementDirection="bottom-up"
      textFadeDelay={0.5}
      className="fixed inset-0 z-[100]"
      onComplete={() => setShow(false)}
    />
  );
}
