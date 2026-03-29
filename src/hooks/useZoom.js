import { useRef, useEffect, useState } from "react";

const MIN_SCALE = 0.3;
const MAX_SCALE = 4.0;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export function useZoom() {
  const zoomRef = useRef(null);
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const rafRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = zoomRef.current;
    if (!el) return;

    // Smooth lerp animaatio kohti targetScale-arvoa
    const animate = () => {
      const current = scaleRef.current;
      const target  = targetScaleRef.current;
      const diff    = target - current;
      if (Math.abs(diff) < 0.001) {
        scaleRef.current = target;
        setScale(target);
        rafRef.current = null;
        return;
      }
      const next = current + diff * 0.18; // 0.18 = smooth easing nopeus
      scaleRef.current = next;
      setScale(next);
      rafRef.current = requestAnimationFrame(animate);
    };

    const applyZoom = (delta) => {
      const next = clamp(targetScaleRef.current * delta, MIN_SCALE, MAX_SCALE);
      targetScaleRef.current = next;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    };

    // ── Ctrl + wheel ─────────────────────────────────────────
    const onWheel = (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      // Pienet askeleet → sulava zoom
      const delta = 1 - e.deltaY * 0.004;
      applyZoom(clamp(delta, 0.85, 1.18));
    };

    // ── Touch pinch ──────────────────────────────────────────
    let lastDist = null;
    const getDistance = (touches) =>
      Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      );

    const onTouchStart = (e) => {
      if (e.touches.length === 2) lastDist = getDistance(e.touches);
    };
    const onTouchMove = (e) => {
      if (e.touches.length !== 2 || lastDist === null) return;
      e.preventDefault();
      const dist  = getDistance(e.touches);
      const delta = dist / lastDist;
      lastDist    = dist;
      applyZoom(delta);
    };
    const onTouchEnd = (e) => {
      if (e.touches.length < 2) lastDist = null;
    };

    el.addEventListener("wheel",      onWheel,      { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    el.addEventListener("touchend",   onTouchEnd);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  const zoomStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    width: `${100 / scale}%`,
    willChange: "transform",
  };

  return { zoomRef, zoomStyle, scale };
}