import { useEffect, useRef, useState, RefObject } from "react";

export interface UseScrollScrubbingOptions {
  frameCount: number;
  framePath: (index: number) => string;
  reducedMotionFrame?: number;
  fit?: "contain" | "cover";
  scaleFactor?: number;
}

export function useScrollScrubbing(
  containerRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: UseScrollScrubbingOptions
) {
  const {
    frameCount,
    framePath,
    reducedMotionFrame = Math.floor(frameCount / 2),
    fit = "contain",
    scaleFactor = 0.94,
  } = options;

  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render frame on canvas with contain or cover logic
    const renderFrame = (img: HTMLImageElement) => {
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      let drawW: number;
      let drawH: number;
      let offsetX: number;
      let offsetY: number;

      if (fit === "contain") {
        // Contain mode: entire machinery is visible without edge clipping
        const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight) * scaleFactor;
        drawW = img.naturalWidth * scale;
        drawH = img.naturalHeight * scale;
        offsetX = (w - drawW) / 2;
        offsetY = (h - drawH) / 2;
      } else {
        // Cover mode
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        if (canvasRatio > imgRatio) {
          drawW = w;
          drawH = w / imgRatio;
        } else {
          drawH = h;
          drawW = h * imgRatio;
        }
        offsetX = (w - drawW) / 2;
        offsetY = (h - drawH) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    // Helper to get nearest loaded frame to prevent any blank flicker
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      const direct = imagesRef.current[targetIndex];
      if (direct && direct.complete && direct.naturalWidth > 0) return direct;

      let closest: HTMLImageElement | null = null;
      let minDiff = Infinity;
      for (let i = 0; i < frameCount; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - targetIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = candidate;
          }
        }
      }
      return closest;
    };

    // Resize canvas resolution to match its visible bounding box
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const newWidth = Math.round(rect.width * dpr);
      const newHeight = Math.round(rect.height * dpr);

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }

      const bestImg = getBestAvailableImage(currentFrameRef.current);
      if (bestImg) {
        renderFrame(bestImg);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const staticImg = new Image();
      staticImg.src = framePath(reducedMotionFrame);
      staticImg.onload = () => {
        currentFrameRef.current = reducedMotionFrame;
        imagesRef.current[reducedMotionFrame] = staticImg;
        renderFrame(staticImg);
        setIsLoaded(true);
      };
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // Preload all frames, prioritizing frame 0 for immediate render
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    let loadedCount = 0;
    const firstImg = new Image();
    firstImg.src = framePath(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      loadedCount++;
      currentFrameRef.current = 0;
      renderFrame(firstImg);
      if (loadedCount === frameCount) {
        setIsLoaded(true);
      }
    };

    // Preload remaining frames
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      images[i] = img;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };
    }

    // Scroll scrubbing logic with sticky container awareness
    let requestId: number;
    let isIntersecting = false;

    const handleScroll = () => {
      if (!isIntersecting || !container) return;
      if (requestId) cancelAnimationFrame(requestId);

      requestId = requestAnimationFrame(() => {
        if (!container) return;
        const rect = container.getBoundingClientRect();

        // Active scroll distance is parent container height minus viewport height
        const maxScroll = Math.max(1, rect.height - window.innerHeight);
        // 0% when top of container is at 0, 100% when container has scrolled through maxScroll
        const progress = Math.max(0, Math.min(1, -rect.top / maxScroll));

        const frameIndex = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(progress * (frameCount - 1)))
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          const bestImg = getBestAvailableImage(frameIndex);
          if (bestImg) {
            renderFrame(bestImg);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          handleScroll();
        }
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(container);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [containerRef, canvasRef, frameCount, framePath, reducedMotionFrame, fit, scaleFactor]);

  return { isLoaded };
}
