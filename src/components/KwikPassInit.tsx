"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Extend Window object for TS
declare global {
  interface Window {
    merchantInfo: any;
    __KP_LOGIN_SDK_INSTANCE__: any;
    kpqueue: any[];
  }
}

export default function KwikPassInit() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isScriptLoaded && window.__KP_LOGIN_SDK_INSTANCE__) {
      // General page view tracker for "other" pages
      // Product and Collection pages will trigger their own specific events
      if (!pathname.startsWith("/product") && !pathname.startsWith("/collections")) {
        const event = new CustomEvent("page_view_kp", {
          detail: {
            type: "other",
            data: {
              cart_id: "", // optionally populate if cart is available globally
            },
          },
        });
        window.dispatchEvent(event);
      }
    }
  }, [pathname, isScriptLoaded]);

  return (
    <>
      <script
        id="kwikpass-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.merchantInfo = {
            ...window.merchantInfo,
            mid: "${process.env.NEXT_PUBLIC_GOKWIK_MERCHANT_ID || ""}",
            environment: "${process.env.NEXT_PUBLIC_GOKWIK_ENV || "production"}",
            type: "merchantInfo",
            integrationType: 'CUSTOM_HEADLESS'
          };
        `,
        }}
      />
      <Script
        id="kwikpass-script"
        src={
          process.env.NEXT_PUBLIC_GOKWIK_ENV === "production"
            ? "https://pdp.gokwik.co/kwikpass/plugin/build/kp-custom-merchant.js"
            : "https://sandbox.pdp.gokwik.co/kwikpass/plugin/build/kp-custom-merchant.js"
        }
        strategy="afterInteractive"
        onLoad={() => {
          console.log("KwikPass SDK script loaded successfully!");
          
          window.__KP_LOGIN_SDK_INSTANCE__ = window.__KP_LOGIN_SDK_INSTANCE__ || {};
          window.__KP_LOGIN_SDK_INSTANCE__.logEvents =
            window.__KP_LOGIN_SDK_INSTANCE__.logEvents ||
            function (event: any) {
              window.kpqueue = window.kpqueue || [];
              window.kpqueue.push(event);
            };

          setIsScriptLoaded(true);
          window.dispatchEvent(new CustomEvent("kp-script-loaded"));
        }}
      />
    </>
  );
}
