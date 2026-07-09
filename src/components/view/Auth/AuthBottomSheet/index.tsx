"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import TruecallerButton, { TruecallerProfile } from "@/components/view/Auth/TruecallerButton";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

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
  const [tcLoading, setTcLoading] = useState(false);
  const router = useRouter();

  /** Complete sign-in after Truecaller verification */
  async function handleTruecallerVerified(session: TruecallerProfile) {
    setTcLoading(true);
    const toastId = toast.loading("Signing you in…");
    try {
      const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL!;
      const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

      const shopify = async (query: string, variables: Record<string, unknown>) => {
        const res = await fetch(SHOPIFY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
          },
          body: JSON.stringify({ query, variables }),
        });
        const json = await res.json();
        return json.data;
      };

      const email = session.email || `tc_${session.phone.replace(/\D/g, "")}@sexuloon.app`;
      const phone = session.phone;
      const password = `TC_${phone}_verified_sexuloon`;

      // Try to create a new Shopify customer
      const signupData = await shopify(
        `mutation CreateCustomer($input: CustomerCreateInput!) {
           customerCreate(input: $input) {
             customer { id email }
             customerUserErrors { code message }
           }
         }`,
        {
          input: {
            firstName: session.firstName || "User",
            lastName: session.lastName || "",
            email,
            phone,
            password,
            acceptsMarketing: false,
          },
        }
      );

      const errors = signupData?.customerCreate?.customerUserErrors ?? [];
      const alreadyExists = errors.some(
        (e: { code: string }) => e.code === "TAKEN"
      );

      if (errors.length > 0 && !alreadyExists) {
        throw new Error(errors[0].message);
      }

      // Log the customer in
      const loginData = await shopify(
        `mutation Login($input: CustomerAccessTokenCreateInput!) {
           customerAccessTokenCreate(input: $input) {
             customerAccessToken { accessToken expiresAt }
             customerUserErrors { message }
           }
         }`,
        { input: { email, password } }
      );

      const token =
        loginData?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
      if (!token) throw new Error("Could not create access token");

      setCookie(null, "customerAccessToken", token, { maxAge: 60 * 60 * 24 * 30 });

      toast.success(
        alreadyExists
          ? `Welcome back, ${session.firstName || "there"}! 👋`
          : `Welcome to Sexuloon, ${session.firstName || "there"}! 🎉`,
        { id: toastId }
      );

      onClose();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("[TC sign-in]", err);
      toast.error(
        err instanceof Error ? err.message : "Truecaller sign-in failed. Please try email.",
        { id: toastId }
      );
    } finally {
      setTcLoading(false);
    }
  }

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
              onVerified={handleTruecallerVerified}
              onNotInstalled={() => {
                // Clerk form is below — user can use that instead
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
