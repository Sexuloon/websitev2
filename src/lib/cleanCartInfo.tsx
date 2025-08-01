"use client";
import { useEffect } from "react";

function CleanCartInfo() {
  useEffect(() => {
    const cartInfo = window.localStorage.getItem("cartId");
    if (cartInfo) {
      setTimeout(() => {
        window.localStorage.removeItem("cartId");
      }, 2000);
      return;
    }
  }, []);

  return null;
}

export default CleanCartInfo;
