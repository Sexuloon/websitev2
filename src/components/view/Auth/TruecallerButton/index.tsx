"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TruecallerState =
  | "idle"          // Detecting platform
  | "available"     // Mobile + shown
  | "loading"       // Button clicked, triggering deep link
  | "waiting"       // Deep link fired, detecting if app opened
  | "not_installed" // App not found — show fallback msg
  | "error"         // Nonce/network error
  | "unavailable";  // Desktop or unsupported

// ─── Mobile detection (Android + iOS) ────────────────────────────────────────

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

function isAndroid(): boolean {
  return /android/i.test(navigator?.userAgent ?? "");
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator?.userAgent ?? "");
}

// ─── Truecaller SVG Logo ──────────────────────────────────────────────────────

function TruecallerLogo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue circle background */}
      <circle cx="30" cy="30" r="30" fill="#009DE0" />
      {/* White "T" checkmark */}
      <path
        d="M14 18h32M30 18v24"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 33l6 6 12-14"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="tc-spinner"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface TruecallerButtonProps {
  /** Called when Truecaller returns a verified session */
  onVerified?: (session: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  /** Called when Truecaller is not installed (to show fallback UI) */
  onNotInstalled?: () => void;
  className?: string;
}

export default function TruecallerButton({
  onVerified,
  onNotInstalled,
  className = "",
}: TruecallerButtonProps) {
  const [state, setState] = useState<TruecallerState>("idle");
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");
  const focusCheckRef = useRef<NodeJS.Timeout | null>(null);

  // ── Detect platform on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (!isMobileDevice()) {
      setState("unavailable");
      return;
    }
    if (isAndroid()) setPlatform("android");
    else if (isIOS()) setPlatform("ios");

    // Check if we came back from a successful Truecaller callback
    const params = new URLSearchParams(window.location.search);
    if (params.get("tc_success") === "1") {
      setState("loading");
      fetch("/api/truecaller/session")
        .then((r) => r.json())
        .then(({ session }) => {
          if (session?.verified && onVerified) {
            onVerified(session);
          }
          setState("available");
        })
        .catch(() => setState("available"));
    } else {
      setState("available");
    }
  }, []);

  // ── Trigger the Truecaller deep link ──────────────────────────────────────
  const handleClick = async () => {
    if (state !== "available") return;
    setState("loading");

    try {
      // 1. Get a fresh nonce from the server
      const res = await fetch("/api/truecaller/init");
      if (!res.ok) throw new Error("Failed to get nonce");
      const { nonce } = await res.json();

      const partnerKey =
        process.env.NEXT_PUBLIC_TRUECALLER_PARTNER_KEY ??
        "tOM6rd098f1e0f4184a92912c18b70947d51f";
      const partnerName = encodeURIComponent("Sexuloon");
      const callbackUrl = encodeURIComponent(
        `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sexuloon.com"}/api/truecaller/callback`
      );

      // 2. Build deep link — same URL scheme works for both Android & iOS
      const deepLink =
        `truecallersdk://truesdk/web_verify` +
        `?requestNonce=${nonce}` +
        `&partnerKey=${partnerKey}` +
        `&partnerName=${partnerName}` +
        `&lang=en` +
        `&privacyUrl=${encodeURIComponent("https://www.sexuloon.com/privacy%26policy")}` +
        `&termsUrl=${encodeURIComponent("https://www.sexuloon.com/terms%26conditions")}`;

      // 3. Fire the deep link
      setState("waiting");
      window.location.href = deepLink;

      // 4. After 700ms, check if the page still has focus.
      //    If yes → Truecaller app did NOT open (not installed).
      //    If no  → App opened, we wait for the callback redirect.
      focusCheckRef.current = setTimeout(() => {
        if (document.hasFocus()) {
          // App not installed
          setState("not_installed");
          onNotInstalled?.();
        }
        // else: app opened, page will redirect via callback — do nothing
      }, 700);
    } catch (err) {
      console.error("[TruecallerButton] Error:", err);
      setState("error");
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (focusCheckRef.current) clearTimeout(focusCheckRef.current);
    };
  }, []);

  // ── Don't render on desktop ──────────────────────────────────────────────
  if (state === "unavailable" || state === "idle") return null;

  // ── App not installed — show helpful message ──────────────────────────────
  if (state === "not_installed") {
    return (
      <div className="tc-not-installed">
        <span className="tc-not-installed-icon">📱</span>
        <p>
          Truecaller app not found.{" "}
          <a
            href={
              platform === "ios"
                ? "https://apps.apple.com/app/truecaller/id548776920"
                : "https://play.google.com/store/apps/details?id=com.truecaller"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Install it
          </a>{" "}
          for one-tap sign-in, or use email below.
        </p>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (state === "error") {
    return (
      <div className="tc-not-installed">
        <span className="tc-not-installed-icon">⚠️</span>
        <p>
          Truecaller verification failed.{" "}
          <button onClick={() => setState("available")} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
            Try again
          </button>{" "}
          or use email below.
        </p>
      </div>
    );
  }

  const isActive = state === "loading" || state === "waiting";

  return (
    <button
      id="truecaller-signin-btn"
      className={`tc-button ${isActive ? "tc-button--loading" : ""} ${className}`}
      onClick={handleClick}
      disabled={isActive}
      aria-label="Continue with Truecaller"
    >
      {/* Animated gradient border */}
      <span className="tc-button__border" aria-hidden="true" />

      <span className="tc-button__inner">
        {isActive ? (
          <>
            <Spinner />
            <span className="tc-button__text">
              {state === "waiting" ? "Opening Truecaller…" : "Connecting…"}
            </span>
          </>
        ) : (
          <>
            <span className="tc-button__logo">
              <TruecallerLogo size={22} />
            </span>
            <span className="tc-button__text">Continue with Truecaller</span>
            <span className="tc-button__badge">
              {platform === "ios" ? "iOS" : "Android"}
            </span>
          </>
        )}
      </span>

      {/* Shimmer sweep on hover */}
      <span className="tc-button__shimmer" aria-hidden="true" />
    </button>
  );
}
