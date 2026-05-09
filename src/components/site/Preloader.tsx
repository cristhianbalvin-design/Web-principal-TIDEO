import { useEffect, useState } from "react";

import preloaderVideo from "@/assets/tideo-logo-preloader.webm";

const FALLBACK_EXIT_DELAY = 9000;
const UNMOUNT_DELAY = 2850;
const EXIT_BEFORE_END_SECONDS = 2;

export function Preloader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, reduceMotion ? 350 : FALLBACK_EXIT_DELAY);

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
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (
            Number.isFinite(video.duration) &&
            video.duration - video.currentTime <= EXIT_BEFORE_END_SECONDS
          ) {
            setIsLeaving(true);
          }
        }}
        onEnded={() => setIsLeaving(true)}
        onError={() => setIsLeaving(true)}
      >
        <source src={preloaderVideo} type="video/webm" />
      </video>
    </div>
  );
}
