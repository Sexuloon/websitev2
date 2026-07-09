"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import TruecallerButton from "@/components/view/Auth/TruecallerButton";
import { X } from "lucide-react";

interface AuthBottomSheetProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: "sign-in" | "sign-up";
}

export default function AuthBottomSheet({
  open,
  onClose,
  defaultMode = "sign-in",
}: AuthBottomSheetProps) {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      // Slight delay so CSS transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      setAnimateIn(false);
      const t = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 350);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="auth-sheet-backdrop"
        style={{ opacity: animateIn ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className="auth-sheet"
        style={{ transform: animateIn ? "translateY(0)" : "translateY(100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to Sexuloon"
      >
        {/* Handle bar */}
        <div className="auth-sheet__handle" />

        {/* Header */}
        <div className="auth-sheet__header">
          <div>
            <h2 className="auth-sheet__title">Welcome to Sexuloon</h2>
            <p className="auth-sheet__subtitle">Sign in or create your account</p>
          </div>
          <button
            onClick={onClose}
            className="auth-sheet__close"
            aria-label="Close"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="auth-sheet__body">
          {/* Truecaller one-tap — always first */}
          <div className="auth-sheet__tc-section">
            <TruecallerButton
              onVerified={(_session) => {
                // Session is handled internally in TruecallerButton
                onClose();
              }}
              onNotInstalled={() => {
                // Just collapse the Truecaller section — Clerk form is below
              }}
            />
          </div>

          {/* OR divider */}
          <div className="auth-sheet__divider">
            <span className="auth-sheet__divider-line" />
            <span className="auth-sheet__divider-text">or continue with</span>
            <span className="auth-sheet__divider-line" />
          </div>

          {/* Clerk's sign-in component — embedded, not modal */}
          <div className="auth-sheet__clerk">
            <SignIn
              routing="hash"
              afterSignInUrl="/"
              afterSignUpUrl="/"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 p-0 bg-transparent",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "border border-gray-200 dark:border-[#262626] rounded-xl h-11 font-medium text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all",
                  formFieldInput:
                    "rounded-xl border-gray-200 dark:border-[#262626] dark:bg-[#111111] h-11 text-sm",
                  formButtonPrimary:
                    "bg-black hover:bg-gray-800 dark:bg-[#1a4731] dark:hover:bg-[#143828] rounded-xl h-11 font-semibold text-sm transition-all",
                  footerActionLink: "text-[#009DE0] font-semibold",
                  dividerLine: "bg-gray-200 dark:bg-[#262626]",
                  dividerText: "text-gray-400 text-xs uppercase tracking-wider",
                  formFieldLabel: "text-sm font-medium text-gray-700 dark:text-[#B8A99A]",
                  identityPreviewEditButton: "text-[#009DE0]",
                },
                layout: {
                  socialButtonsPlacement: "top",
                  showOptionalFields: false,
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
