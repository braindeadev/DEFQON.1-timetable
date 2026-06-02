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
        // Päivitetään scrollLeft välittömästi liikkeen aikana
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

    // MOBIILI-OPTIMOINTI: Poistetaan manuaalinen touch-käsittely,
    // jotta selain voi käyttää omaa natiivia (ja sulavampaa) vieritystään.
    // Pidetään kuitenkin wasDragged-logiikka jos sitä tarvitaan klikkausten estoon,
    // mutta yleensä mobiilissa natiivi 'click' -viive hoitaa tämän.

    return () => {
      el.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
    };
  }, []);

  return { scrollRef, wasDragged };
}