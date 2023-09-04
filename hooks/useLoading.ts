import { useState } from "react";

function useLoading(): [boolean, () => () => void] {
  const [isLoading, setLoading] = useState(false);

  const startLoading = (): (() => void) => {
    setLoading(true);
    return () => setLoading(false);
  };

  return [isLoading, startLoading];
}

export default useLoading;
