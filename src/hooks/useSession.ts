import { useEffect, useState } from "react";

export const useSession = () => {
  const [info, setInfo] = useState(() => {
    if (typeof window !== "undefined") {
      return window.sessionStorage.getItem("loaded");
    }
    return null;
  });

  useEffect(() => {
    if (!info && typeof window !== "undefined") {
      window.sessionStorage.setItem("loaded", JSON.stringify(true));
      setInfo("true");
    }
  }, [info]);

  return { info };
};
