import { useEffect, useState } from "react";

import preloaderVideo from "@/assets/tideo-logo-preloader.webm";

const EXIT_DELAY = 4600;
const UNMOUNT_DELAY = 850;

export function Preloader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, reduceMotion ? 350 : EXIT_DELAY);

    return () => window.clearTimeout(exitTimer);
  }, []);

  useEffect(() => {
    if (!isLeaving) return;

    const unmountTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, UNMOUNT_DELAY);

    return () => window.clearTimeout(unmountTimer);
  }, [isLeaving]);

  if (!isMounted) return null;

  return (
    <div className={`preloader ${isLeaving ? "preloader-leaving" : ""}`} aria-hidden>
      <video
        className="preloader-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={preloaderVideo} type="video/webm" />
      </video>
    </div>
  );
}
