import { useState, useEffect } from "react";

function initializeValueFromLocalStorage(key, initialValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(
    initializeValueFromLocalStorage(key, initialValue),
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
