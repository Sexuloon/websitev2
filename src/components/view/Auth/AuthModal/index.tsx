"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TruecallerButton from "@/components/view/Auth/TruecallerButton";
import type { TruecallerProfile } from "@/components/view/Auth/TruecallerButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "sign-in" | "sign-up";
type Step = "main" | "tc-email" | "forgot-pw";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: Mode;
  onAuthSuccess?: () => void;
}

// ─── Google Button ────────────────────────────────────────────────────────────

function GoogleButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="am-social"
      id="google-signin-btn"
      aria-label="Continue with Google"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
      {loading ? "Redirecting…" : "Continue with Google"}
    </button>
  );
}

// ─── Main AuthModal ───────────────────────────────────────────────────────────

export default function AuthModal({
  open,
  onClose,
  defaultMode = "sign-in",
  onAuthSuccess,
}: AuthModalProps) {
  const [step, setStep] = useState<Step>("main");
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  // Truecaller interim profile (when we have phone but not email)
  const [tcProfile, setTcProfile] = useState<TruecallerProfile | null>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const isMobile = typeof window !== "undefined" &&
    (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

  useEffect(() => { setMode(defaultMode); }, [defaultMode]);

  // Open/close animation
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
      document.body.style.overflow = "hidden";
      setTimeout(() => emailRef.current?.focus(), 400);
    } else {
      setAnimIn(false);
      const t = setTimeout(() => { setVisible(false); document.body.style.overflow = ""; }, 350);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const finalize = useCallback(async (params: {
    email: string;
    firstName?: string;
    lastName?: string;
    source: string;
  }) => {
    const res = await fetch("/api/auth/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Authentication failed");
    return data;
  }, []);

  const handleSuccess = useCallback((name?: string) => {
    toast.success(
      mode === "sign-in"
        ? `Welcome back${name ? `, ${name}` : ""}! 👋`
        : `Welcome to Sexuloon${name ? `, ${name}` : ""}! 🎉`
    );
    onClose();
    onAuthSuccess?.();
    router.refresh();
  }, [mode, onClose, onAuthSuccess, router]);

  // ── Truecaller callback ─────────────────────────────────────────────────────
  const handleTruecallerVerified = useCallback(async (session: TruecallerProfile) => {
    if (session.email) {
      // Has email → finalize immediately, no extra step needed
      try {
        await finalize({ email: session.email, firstName: session.firstName, lastName: session.lastName, source: "truecaller" });
        handleSuccess(session.firstName);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Sign-in failed");
      }
    } else {
      // No email → show "link email" step
      setTcProfile(session);
      setFirstName(session.firstName ?? "");
      setLastName(session.lastName ?? "");
      setEmail("");
      setStep("tc-email");
    }
  }, [finalize, handleSuccess]);

  // ── Truecaller email link submit ────────────────────────────────────────────
  const handleTcEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setFormLoading(true);
    try {
      await finalize({ email: email.toLowerCase().trim(), firstName: tcProfile?.firstName, lastName: tcProfile?.lastName, source: "truecaller" });
      handleSuccess(tcProfile?.firstName);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to link account");
    } finally {
      setFormLoading(false);
    }
  };

  // ── Google ──────────────────────────────────────────────────────────────────
  const handleGoogle = () => {
    setGoogleLoading(true);
    window.location.href = "/api/auth/google";
  };

  // ── Email/password form ─────────────────────────────────────────────────────
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!password || password.length < 8) errs.password = mode === "sign-up" ? "Min. 8 characters" : "Enter your password";
    if (mode === "sign-up" && !firstName.trim()) errs.firstName = "First name required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormLoading(true);
    try {
      const endpoint = mode === "sign-in" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "sign-in"
        ? { email: email.toLowerCase().trim(), password }
        : { email: email.toLowerCase().trim(), password, firstName: firstName.trim(), lastName: lastName.trim() };
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Authentication failed");
      handleSuccess(firstName || undefined);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setFormLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === "sign-in" ? "sign-up" : "sign-in");
    setErrors({});
    setEmail(""); setPassword(""); setFirstName(""); setLastName("");
  };

  // ── Forgot password ─────────────────────────────────────────────────────────
  const [fpSent, setFpSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setFormLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      setFpSent(true);
    } catch {
      // Always show success (security)
      setFpSent(true);
    } finally {
      setFormLoading(false);
    }
  };

  const openForgotPw = () => {
    setStep("forgot-pw");
    setFpSent(false);
    setErrors({});
    // Keep whatever email was typed in the sign-in form
  };

  if (!visible) return null;

  // ─── Panel animation styles ─────────────────────────────────────────────────
  // Sheet (mobile): slide from bottom
  // Modal (desktop): CSS class controls opacity+scale; no inline style override needed
  const sheetStyle = isMobile
    ? { transform: animIn ? "translateY(0)" : "translateY(100%)" }
    : {};

  // For desktop, use a CSS class to trigger the animation (no inline transform)
  const panelClass = `am-panel ${
    isMobile ? "am-panel--sheet" : `am-panel--centered ${animIn ? "am-panel--visible" : "am-panel--hidden"}`
  }`;

  // ─── Truecaller email-link step ─────────────────────────────────────────────
  if (step === "tc-email") {
    return (
      <>
        <div className="am-backdrop" style={{ opacity: animIn ? 1 : 0 }} onClick={onClose} />
        <div className={panelClass} style={sheetStyle} role="dialog" aria-modal="true" aria-label="Link your email">
          {isMobile && <div className="am-handle" />}
          <div className="am-header">
            <div>
              <div className="am-tc-badge">
                <Phone size={14} />
                <span>Truecaller verified ✓</span>
              </div>
              <h2 className="am-title">One last step</h2>
              <p className="am-sub">Enter your email to link your account. This keeps your orders and history in one place.</p>
            </div>
            <button onClick={onClose} className="am-close" aria-label="Close"><X size={15} /></button>
          </div>
          <div className="am-body">
            <div className="am-tc-info">
              <div className="am-tc-avatar">{(tcProfile?.firstName?.[0] ?? "U").toUpperCase()}</div>
              <div>
                <p className="am-tc-name">{tcProfile?.firstName} {tcProfile?.lastName}</p>
                <p className="am-tc-phone">{tcProfile?.phone}</p>
              </div>
            </div>
            <form onSubmit={handleTcEmailSubmit} className="am-form" noValidate>
              <div className="am-field">
                <label className="am-label">Your Email Address</label>
                <div className="am-input-wrap">
                  <Mail size={15} className="am-input-icon" />
                  <input ref={emailRef} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className={`am-input ${errors.email ? "am-input--err" : ""}`} autoComplete="email" id="tc-email-input" />
                </div>
                {errors.email && <p className="am-err">{errors.email}</p>}
              </div>
              <p className="am-hint">If you've ordered before with this email, your existing account will be used automatically.</p>
              <button type="submit" disabled={formLoading} className="am-submit" id="tc-email-submit">
                {formLoading ? <span className="am-spinner" /> : <><span>Continue</span><ArrowRight size={16} /></>}
              </button>
              <button type="button" onClick={() => setStep("main")} className="am-text-btn">← Back</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // ─── Forgot password step ────────────────────────────────────────────────────
  if (step === "forgot-pw") {
    return (
      <>
        <div className="am-backdrop" style={{ opacity: animIn ? 1 : 0 }} onClick={onClose} />
        <div className={panelClass} style={sheetStyle} role="dialog" aria-modal="true" aria-label="Reset your password">
          {isMobile && <div className="am-handle" />}
          <div className="am-header">
            <div>
              <h2 className="am-title">{fpSent ? "Check your inbox" : "Reset password"}</h2>
              <p className="am-sub">
                {fpSent
                  ? `We sent a reset link to ${email}. Click it to set a new password.`
                  : "Enter your email and we'll send you a reset link."}
              </p>
            </div>
            <button onClick={onClose} className="am-close" aria-label="Close"><X size={15} /></button>
          </div>
          <div className="am-body">
            {fpSent ? (
              <>
                <div className="am-fp-success">
                  <span className="am-fp-icon">📬</span>
                  <p>If an account exists for <strong>{email}</strong>, you'll receive a reset link within a minute. Check your spam folder too.</p>
                </div>
                <button type="button" className="am-submit" onClick={() => { setStep("main"); setFpSent(false); }}>
                  <span>Back to Sign In</span>
                </button>
              </>
            ) : (
              <form onSubmit={handleForgotPassword} className="am-form" noValidate>
                <div className="am-field">
                  <label className="am-label">Email Address</label>
                  <div className="am-input-wrap">
                    <Mail size={15} className="am-input-icon" />
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`am-input ${errors.email ? "am-input--err" : ""}`}
                      autoComplete="email"
                      id="fp-email-input"
                    />
                  </div>
                  {errors.email && <p className="am-err">{errors.email}</p>}
                </div>
                <button type="submit" disabled={formLoading} className="am-submit" id="fp-submit">
                  {formLoading ? <span className="am-spinner" /> : <><span>Send Reset Link</span><ArrowRight size={16} /></>}
                </button>
                <button type="button" onClick={() => setStep("main")} className="am-text-btn">← Back to Sign In</button>
              </form>
            )}
          </div>
        </div>
      </>
    );
  }

  // ─── Main step ──────────────────────────────────────────────────────────────
  return (
    <>
      <div className="am-backdrop" style={{ opacity: animIn ? 1 : 0 }} onClick={onClose} aria-hidden="true" />

      <div
        className={panelClass}
        style={sheetStyle}
        role="dialog"
        aria-modal="true"
        aria-label={mode === "sign-in" ? "Sign in to Sexuloon" : "Create account"}
      >
        {isMobile && <div className="am-handle" />}

        {/* Header */}
        <div className="am-header">
          <div>
            <h2 className="am-title">{mode === "sign-in" ? "Welcome back" : "Create account"}</h2>
            <p className="am-sub">{mode === "sign-in" ? "Sign in to your Sexuloon account" : "Join Sexuloon today"}</p>
          </div>
          <button onClick={onClose} className="am-close" aria-label="Close"><X size={15} /></button>
        </div>

        <div className="am-body">
          {/* Truecaller — mobile only via CSS */}
          <TruecallerButton onVerified={handleTruecallerVerified} />

          {/* Google */}
          <GoogleButton onClick={handleGoogle} loading={googleLoading} />

          {/* Divider */}
          <div className="am-divider">
            <span className="am-divider-line" />
            <span className="am-divider-text">or with email</span>
            <span className="am-divider-line" />
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="am-form" noValidate>
            {mode === "sign-up" && (
              <div className="am-row">
                <div className="am-field">
                  <label className="am-label">First Name *</label>
                  <div className="am-input-wrap">
                    <User size={15} className="am-input-icon" />
                    <input type="text" placeholder="First" value={firstName} onChange={e => setFirstName(e.target.value)} className={`am-input ${errors.firstName ? "am-input--err" : ""}`} autoComplete="given-name" id="reg-firstname" />
                  </div>
                  {errors.firstName && <p className="am-err">{errors.firstName}</p>}
                </div>
                <div className="am-field">
                  <label className="am-label">Last Name</label>
                  <div className="am-input-wrap">
                    <User size={15} className="am-input-icon" />
                    <input type="text" placeholder="Last" value={lastName} onChange={e => setLastName(e.target.value)} className="am-input" autoComplete="family-name" id="reg-lastname" />
                  </div>
                </div>
              </div>
            )}

            <div className="am-field">
              <label className="am-label">Email</label>
              <div className="am-input-wrap">
                <Mail size={15} className="am-input-icon" />
                <input ref={emailRef} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className={`am-input ${errors.email ? "am-input--err" : ""}`} autoComplete="email" id="auth-email" />
              </div>
              {errors.email && <p className="am-err">{errors.email}</p>}
            </div>

            <div className="am-field">
              <label className="am-label">Password</label>
              <div className="am-input-wrap">
                <Lock size={15} className="am-input-icon" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder={mode === "sign-up" ? "Min. 8 characters" : "Your password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`am-input ${errors.password ? "am-input--err" : ""}`}
                  autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                  id="auth-password"
                />
                <button type="button" onClick={() => setShowPw(s => !s)} className="am-pw-eye" aria-label={showPw ? "Hide" : "Show"}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="am-err">{errors.password}</p>}
              {mode === "sign-in" && (
                <button
                  type="button"
                  onClick={openForgotPw}
                  className="am-forgot-btn"
                  id="forgot-pw-link"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <button type="submit" disabled={formLoading} className="am-submit" id={mode === "sign-in" ? "login-submit" : "register-submit"}>
              {formLoading
                ? <span className="am-spinner" />
                : <><span>{mode === "sign-in" ? "Sign In" : "Create Account"}</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          <p className="am-toggle">
            {mode === "sign-in" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={switchMode} className="am-toggle-btn">
              {mode === "sign-in" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
