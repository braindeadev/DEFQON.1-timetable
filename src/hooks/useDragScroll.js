import { useRef, useEffect } from "react";

const DRAG_THRESHOLD_PX = 5;

export function useDragScroll() {
  const scrollRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const wasDragged = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      dragState.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft, moved: false };
      wasDragged.current = false;
      el.style.cursor     = "grabbing";
      el.style.userSelect = "none";
    };
    const onMouseMove = (e) => {
      if (!dragState.current.active) return;
      const dx = e.pageX - dragState.current.startX;
      if (Math.abs(dx) > DRAG_THRESHOLD_PX) {
        dragState.current.moved = true;
        wasDragged.current = true;
        e.preventDefault();
        el.scrollLeft = dragState.current.scrollLeft - dx;
      }
    };
    const onMouseUp = () => {
      dragState.current.active = false;
      el.style.cursor     = "grab";
      el.style.userSelect = "";
      setTimeout(() => { wasDragged.current = false; }, 0);
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.style.cursor = "grab";

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      dragState.current = { active: true, startX: t.pageX, scrollLeft: el.scrollLeft, moved: false };
      wasDragged.current = false;
    };
    const onTouchMove = (e) => {
      if (e.touches.length !== 1) { dragState.current.active = false; return; }
      if (!dragState.current.active) return;
      const dx = e.touches[0].pageX - dragState.current.startX;
      if (Math.abs(dx) > DRAG_THRESHOLD_PX) {
        dragState.current.moved = true;
        wasDragged.current = true;
        el.scrollLeft = dragState.current.scrollLeft - dx;
      }
    };
    const onTouchEnd = () => {
      dragState.current.active = false;
      setTimeout(() => { wasDragged.current = false; }, 0);
    };

    el.addEventListener("touchstart",  onTouchStart, { passive: true });
    el.addEventListener("touchmove",   onTouchMove,  { passive: true });
    el.addEventListener("touchend",    onTouchEnd);

    return () => {
      el.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return { scrollRef, wasDragged };
}