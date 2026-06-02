import { useState, useEffect, useCallback, useMemo } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const s = localStorage.getItem("favorites");
      const parsed = s ? JSON.parse(s) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Debounced localStorage sync to avoid blocking the UI on every click
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, 1000);
    return () => clearTimeout(timer);
  }, [favorites]);

  const toggle = useCallback((id) => {
    setFavorites(prev => {
      const s = new Set(prev);
      if (s.has(id)) {
        s.delete(id);
      } else {
        s.add(id);
      }
      return Array.from(s);
    });
  }, []);

  const clear = useCallback(() => setFavorites([]), []);

  // Provide a memoized Set for O(1) lookups in components
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  return { favorites, favoritesSet, toggle, clear, setFavorites };
}
