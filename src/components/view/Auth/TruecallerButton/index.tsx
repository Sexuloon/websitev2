"use client";

import { useEffect, useRef, useState } from "react";

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
      <circle cx="30" cy="30" r="30" fill="#009DE0" />
      {/* Cross-hair "T" */}
      <path
        d="M14 18h32M30 18v24"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Checkmark */}
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
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ClickState = "idle" | "loading" | "waiting" | "not_installed" | "error";

interface TruecallerButtonProps {
  onVerified?: (session: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  onNotInstalled?: () => void;
  className?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────
// Visibility is controlled by CSS (tc-mobile-only class), NOT by JS detection.
// This ensures the button always renders on mobile regardless of hydration timing.

export default function TruecallerButton({
  onVerified,
  onNotInstalled,
  className = "",
}: TruecallerButtonProps) {
  const [clickState, setClickState] = useState<ClickState>("idle");
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");
  const focusCheckRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect platform for badge label + app store link (JS only needed for this)
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform("android");
    else if (/iphone|ipad|ipod/i.test(ua)) setPlatform("ios");

    // If coming back from a successful Truecaller callback redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get("tc_success") === "1") {
      setClickState("loading");
      fetch("/api/truecaller/session")
        .then((r) => r.json())
        .then(({ session }) => {
          if (session?.verified && onVerified) {
            onVerified(session);
          }
          // Clean up URL
          const url = new URL(window.location.href);
          url.searchParams.delete("tc_success");
          window.history.replaceState({}, "", url.toString());
          setClickState("idle");
        })
        .catch(() => setClickState("idle"));
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (focusCheckRef.current) clearTimeout(focusCheckRef.current);
    };
  }, []);

  const handleClick = async () => {
    if (clickState === "loading" || clickState === "waiting") return;
    setClickState("loading");

    try {
      // 1. Get a fresh nonce
      const res = await fetch("/api/truecaller/init");
      if (!res.ok) throw new Error("Failed to get nonce");
      const { nonce } = await res.json();

      const partnerKey =
        process.env.NEXT_PUBLIC_TRUECALLER_PARTNER_KEY ??
        "tOM6rd098f1e0f4184a92912c18b70947d51f";
      const partnerName = encodeURIComponent("Sexuloon");

      // 2. Build deep link — same scheme works for Android & iOS
      const deepLink =
        `truecallersdk://truesdk/web_verify` +
        `?requestNonce=${nonce}` +
        `&partnerKey=${partnerKey}` +
        `&partnerName=${partnerName}` +
        `&lang=en` +
        `&privacyUrl=${encodeURIComponent("https://www.sexuloon.com/privacy&policy")}` +
        `&termsUrl=${encodeURIComponent("https://www.sexuloon.com/terms&conditions")}`;

      // 3. Fire the deep link
      setClickState("waiting");
      window.location.href = deepLink;

      // 4. If page still has focus after 800ms → app not installed
      focusCheckRef.current = setTimeout(() => {
        if (document.hasFocus()) {
          setClickState("not_installed");
          onNotInstalled?.();
        }
        // else: app opened — wait for Truecaller to POST callback + redirect
      }, 800);
    } catch (err) {
      console.error("[TruecallerButton]", err);
      setClickState("error");
    }
  };

  const isActive = clickState === "loading" || clickState === "waiting";

  // "not_installed" message
  if (clickState === "not_installed") {
    return (
      <div className="tc-mobile-only tc-not-installed">
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

  // Error state
  if (clickState === "error") {
    return (
      <div className="tc-mobile-only tc-not-installed">
        <span className="tc-not-installed-icon">⚠️</span>
        <p>
          Truecaller sign-in failed.{" "}
          <button
            onClick={() => setClickState("idle")}
            style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit" }}
          >
            Try again
          </button>{" "}
          or use email below.
        </p>
      </div>
    );
  }

  // ── Main button — always in DOM, CSS controls visibility ──────────────────
  return (
    <button
      id="truecaller-signin-btn"
      className={`tc-mobile-only tc-button ${isActive ? "tc-button--loading" : ""} ${className}`}
      onClick={handleClick}
      disabled={isActive}
      aria-label="Continue with Truecaller"
      type="button"
    >
      <span className="tc-button__border" aria-hidden="true" />

      <span className="tc-button__inner">
        {isActive ? (
          <>
            <Spinner />
            <span className="tc-button__text">
              {clickState === "waiting" ? "Opening Truecaller…" : "Connecting…"}
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

      <span className="tc-button__shimmer" aria-hidden="true" />
    </button>
  );
}
