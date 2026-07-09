"use client";

import { useEffect, useRef, useState } from "react";

// ─── Truecaller SVG Logo ──────────────────────────────────────────────────────

function TruecallerLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="30" fill="#009DE0" />
      <path d="M14 18h32M30 18v24" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 33l6 6 12-14" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="tc-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type BtnState = "idle" | "loading" | "waiting" | "not_installed" | "timed_out" | "error";

export interface TruecallerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface TruecallerButtonProps {
  onVerified?: (session: TruecallerProfile) => void;
  onNotInstalled?: () => void;
  className?: string;
}

const POLL_INTERVAL_MS = 2000;   // Poll every 2 seconds
const POLL_TIMEOUT_MS = 90000;   // Give up after 90 seconds
const APP_CHECK_DELAY_MS = 2500; // How long to wait before checking if app opened

// ─── Component ───────────────────────────────────────────────────────────────

export default function TruecallerButton({
  onVerified,
  onNotInstalled,
  className = "",
}: TruecallerButtonProps) {
  const [btnState, setBtnState] = useState<BtnState>("idle");
  const [platform, setPlatform] = useState<"android" | "ios" | "other">("other");

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appCheckRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nonceRef = useRef<string>("");

  // Detect platform for badge + App Store link
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform("android");
    else if (/iphone|ipad|ipod/i.test(ua)) setPlatform("ios");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopPolling();
  }, []);

  function stopPolling() {
    if (pollIntervalRef.current) { clearInterval(pollIntervalRef.current); pollIntervalRef.current = null; }
    if (pollTimeoutRef.current) { clearTimeout(pollTimeoutRef.current); pollTimeoutRef.current = null; }
    if (appCheckRef.current) { clearTimeout(appCheckRef.current); appCheckRef.current = null; }
  }

  function startPolling(nonce: string) {
    // Poll every POLL_INTERVAL_MS
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/truecaller/poll?nonce=${nonce}`);
        const data = await res.json();

        if (data.status === "verified" && data.profile) {
          stopPolling();
          setBtnState("idle");
          onVerified?.(data.profile);
        } else if (data.status === "failed") {
          stopPolling();
          setBtnState("error");
        }
        // "pending" or "unknown" → keep polling
      } catch {
        // Network error during poll — keep trying
      }
    }, POLL_INTERVAL_MS);

    // Stop polling after POLL_TIMEOUT_MS
    pollTimeoutRef.current = setTimeout(() => {
      stopPolling();
      if (btnState !== "idle") {
        setBtnState("timed_out");
      }
    }, POLL_TIMEOUT_MS);
  }

  const handleClick = async () => {
    if (btnState === "loading" || btnState === "waiting") return;

    stopPolling();
    setBtnState("loading");

    try {
      // 1. Get nonce from server
      const res = await fetch("/api/truecaller/init");
      if (!res.ok) throw new Error("Failed to get nonce");
      const { nonce } = await res.json();
      nonceRef.current = nonce;

      const partnerKey = "tOM6rd098f1e0f4184a92912c18b70947d51f";
      const partnerName = encodeURIComponent("Sexuloon");

      // 2. Build deep link (same scheme for Android & iOS)
      const deepLink =
        `truecallersdk://truesdk/web_verify` +
        `?requestNonce=${nonce}` +
        `&partnerKey=${partnerKey}` +
        `&partnerName=${partnerName}` +
        `&lang=en` +
        `&privacyUrl=${encodeURIComponent("https://www.sexuloon.com/privacy&policy")}` +
        `&termsUrl=${encodeURIComponent("https://www.sexuloon.com/terms&conditions")}`;

      // 3. Fire the deep link
      setBtnState("waiting");
      window.location.href = deepLink;

      // 4. Start polling the server for the callback result
      startPolling(nonce);

      // 5. After APP_CHECK_DELAY_MS, check if the browser still has focus.
      //    If yes → Truecaller app likely not installed.
      //    We only switch to "not_installed" if still in "waiting" state.
      appCheckRef.current = setTimeout(() => {
        if (document.hasFocus() && btnState !== "idle") {
          stopPolling();
          setBtnState("not_installed");
          onNotInstalled?.();
        }
        // If focus was lost → app opened → keep polling
      }, APP_CHECK_DELAY_MS);
    } catch (err) {
      console.error("[TruecallerButton]", err);
      stopPolling();
      setBtnState("error");
    }
  };

  const reset = () => {
    stopPolling();
    setBtnState("idle");
  };

  // ── Not installed ─────────────────────────────────────────────────────────
  if (btnState === "not_installed") {
    return (
      <div className="tc-mobile-only tc-not-installed">
        <span className="tc-not-installed-icon">📱</span>
        <p>
          Truecaller not installed.{" "}
          <a
            href={platform === "ios"
              ? "https://apps.apple.com/app/truecaller/id548776920"
              : "https://play.google.com/store/apps/details?id=com.truecaller"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Install it
          </a>{" "}
          or use email below.
        </p>
      </div>
    );
  }

  // ── Timed out ─────────────────────────────────────────────────────────────
  if (btnState === "timed_out") {
    return (
      <div className="tc-mobile-only tc-not-installed">
        <span className="tc-not-installed-icon">⏱️</span>
        <p>
          Truecaller sign-in timed out.{" "}
          <button onClick={reset} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
            Try again
          </button>{" "}
          or use email below.
        </p>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (btnState === "error") {
    return (
      <div className="tc-mobile-only tc-not-installed">
        <span className="tc-not-installed-icon">⚠️</span>
        <p>
          Sign-in failed.{" "}
          <button onClick={reset} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
            Try again
          </button>{" "}
          or use email below.
        </p>
      </div>
    );
  }

  const isActive = btnState === "loading" || btnState === "waiting";

  // ── Main button ───────────────────────────────────────────────────────────
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
              {btnState === "waiting" ? "Waiting for Truecaller…" : "Connecting…"}
            </span>
          </>
        ) : (
          <>
            <span className="tc-button__logo"><TruecallerLogo size={22} /></span>
            <span className="tc-button__text">Continue with Truecaller</span>
            <span className="tc-button__badge">{platform === "ios" ? "iOS" : "Android"}</span>
          </>
        )}
      </span>

      <span className="tc-button__shimmer" aria-hidden="true" />
    </button>
  );
}
