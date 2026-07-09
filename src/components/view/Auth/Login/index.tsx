"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStorefrontMutation } from "@/hooks/useStorefront";
import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_CREATE } from "@/graphql/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import TruecallerButton from "@/components/view/Auth/TruecallerButton";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormProps = {
  setShowRegister: (show: boolean) => void;
};

const Login = ({ setShowRegister }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tcNotInstalled, setTcNotInstalled] = useState(false);
  const { mutate } = useStorefrontMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const response = (await mutate({
        query: CUSTOMER_ACCESS_TOKEN_CREATE,
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      })) as {
        customerAccessTokenCreate: {
          customerUserErrors: { message: string }[];
          customerAccessToken: { accessToken: string };
        };
      };

      if (response.customerAccessTokenCreate.customerUserErrors.length > 0) {
        throw new Error("Failed to login");
      }

      setCookie(
        null,
        "customerAccessToken",
        response.customerAccessTokenCreate.customerAccessToken.accessToken,
        {
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }
      );
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Called when Truecaller returns a verified profile.
   * We use the phone number to find or create a Shopify customer,
   * then log them in via customerAccessToken.
   */
  async function handleTruecallerVerified(session: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    setIsLoading(true);
    try {
      // Attempt to log in with the email Truecaller provided
      if (session.email) {
        // Try existing account first — if it works, great
        const loginRes = (await mutate({
          query: CUSTOMER_ACCESS_TOKEN_CREATE,
          variables: {
            input: {
              email: session.email,
              // We don't know the password; this will fail for non-TC accounts
              // A real production app should use Shopify Multipass here
              password: `TC_${session.phone}_verified`,
            },
          },
        }).catch(() => null)) as any;

        if (
          loginRes?.customerAccessTokenCreate?.customerAccessToken?.accessToken
        ) {
          setCookie(
            null,
            "customerAccessToken",
            loginRes.customerAccessTokenCreate.customerAccessToken.accessToken,
            { maxAge: 60 * 60 * 24 * 30 }
          );
          toast.success(`Welcome back, ${session.firstName}! 👋`);
          router.push("/");
          return;
        }
      }

      // If login fails, create a new Shopify account for this Truecaller user
      const signupRes = (await mutate({
        query: CUSTOMER_CREATE,
        variables: {
          input: {
            firstName: session.firstName || "Truecaller",
            lastName: session.lastName || "User",
            email:
              session.email ||
              `tc_${session.phone.replace(/\D/g, "")}@sexuloon.app`,
            phone: session.phone,
            password: `TC_${session.phone}_verified`,
            acceptsMarketing: false,
          },
        },
      })) as any;

      if (signupRes?.customerCreate?.customerUserErrors?.length > 0) {
        throw new Error(signupRes.customerCreate.customerUserErrors[0].message);
      }

      // Now log in with the newly created account
      if (session.email || signupRes?.customerCreate?.customer?.email) {
        const email =
          session.email || signupRes.customerCreate.customer.email;
        const tokenRes = (await mutate({
          query: CUSTOMER_ACCESS_TOKEN_CREATE,
          variables: {
            input: {
              email,
              password: `TC_${session.phone}_verified`,
            },
          },
        })) as any;

        if (
          tokenRes?.customerAccessTokenCreate?.customerAccessToken?.accessToken
        ) {
          setCookie(
            null,
            "customerAccessToken",
            tokenRes.customerAccessTokenCreate.customerAccessToken.accessToken,
            { maxAge: 60 * 60 * 24 * 30 }
          );
          toast.success(`Welcome to Sexuloon, ${session.firstName}! 🎉`);
          router.push("/");
          return;
        }
      }

      throw new Error("Could not complete Truecaller sign-in");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Truecaller sign-in failed. Please use email."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }
        }}
      >
        {/* ── Truecaller one-tap (mobile only) ─────────────────────────── */}
        <div className="tc-section">
          <TruecallerButton
            onVerified={handleTruecallerVerified}
            onNotInstalled={() => setTcNotInstalled(true)}
          />
        </div>

        {/* ── OR divider (only shown if Truecaller button rendered) ─────── */}
        <div className="tc-divider" aria-hidden="true">
          <span className="tc-divider__line" />
          <span className="tc-divider__text">or continue with email</span>
          <span className="tc-divider__line" />
        </div>

        {/* ── Standard email / password ──────────────────────────────────── */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            variant="link"
            onClick={() => setShowRegister(true)}
            className="text-sm"
          >
            Don&apos;t have an account? <b>Register</b>
          </Button>
          <Button type="submit" className="w-1/2" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Login;
