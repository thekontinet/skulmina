import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const [storedValue, setStoredValue] = useState<T | null>(() => {
    if (isLocalStorageAvailable) {
      const item = window.localStorage.getItem(key) || "";
      return item ? JSON.parse(item) : initialValue;
    } else {
      return initialValue;
    }
  });

  // Update the localStorage value when the state changes
  const setValue = (value: T) => {
    if (isLocalStorageAvailable) {
      const newValue = value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    }
  };

  // Remove the key from localStorage and reset the state
  const removeValue = () => {
    if (isLocalStorageAvailable) {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    }
  };

  return { storedValue, setValue, removeValue };
};
