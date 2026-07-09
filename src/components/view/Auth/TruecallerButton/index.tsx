"use client";

import { useEffect, useRef, useState } from "react";

// ─── Truecaller Brand Mark ────────────────────────────────────────────────────
// Uses Truecaller's actual brand: blue shield+phone icon + "truecaller" wordmark

function TruecallerLogo() {
  return (
    <span className="tc-logo-wrap" aria-hidden="true">
      {/* Shield + phone-tick icon — Truecaller's actual brand shape */}
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#009DE0"/>
        {/* Phone with checkmark — clean minimal version */}
        <path
          d="M14 13h5l2 4.5-2.5 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2.5 4.5 2V28c0 1-1 2-2 1.5C14.5 27 11 19.5 12.5 14c-.5-1 .5-1 1.5-1z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          d="M23 16l2 2 4-4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* "truecaller" wordmark in brand blue italic */}
      <span className="tc-logo-wordmark">truecaller</span>
    </span>
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
      className={`tc-mobile-only am-social tc-button-clean ${isActive ? "tc-button-clean--loading" : ""} ${className}`}
      onClick={handleClick}
      disabled={isActive}
      aria-label="Continue with Truecaller"
      type="button"
    >
      {isActive ? (
        <>
          <span className="am-spinner" style={{ borderTopColor: "#009DE0", borderColor: "rgba(0,157,224,0.25)" }} />
          <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>
            {btnState === "waiting" ? "Waiting for Truecaller…" : "Connecting…"}
          </span>
        </>
      ) : (
        <TruecallerLogo />
      )}
    </button>
  );
}

