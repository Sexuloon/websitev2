"use client";

import { useEffect } from "react";

export default function KwikPassSSOButton() {
  useEffect(() => {
    const initSSOButton = () => {
      if (window.__KP_LOGIN_SDK_INSTANCE__ && window.__KP_LOGIN_SDK_INSTANCE__.handleKpSSOButton) {
        window.__KP_LOGIN_SDK_INSTANCE__.handleKpSSOButton();
      }
    };

    // Attempt to initialize immediately in case script is already loaded
    initSSOButton();

    // Also listen for script load event
    window.addEventListener("kp-script-loaded", initSSOButton);
    return () => {
      window.removeEventListener("kp-script-loaded", initSSOButton);
    };
  }, []);

  return (
    <div
      id="kwikpass-sso-container"
      className="flex items-center justify-center min-w-[120px] h-10"
      // @ts-ignore - custom attribute required by KwikPass
      logo="https://pdp.gokwik.co/kwikpass/assets/icons/kwik_pass_logo.svg"
    ></div>
  );
}
