"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { CustomerCreateResponse } from "@/types";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import TruecallerButton from "@/components/view/Auth/TruecallerButton";

const signupSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

type SignupFormProps = {
  setShowRegister: (show: boolean) => void;
};

export default function SignupForm({ setShowRegister }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useStorefrontMutation<CustomerCreateResponse>();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);
    try {
      const response = await mutate({
        query: CUSTOMER_CREATE,
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          },
        },
      });
      if (response.customerCreate.customerUserErrors.length > 0) {
        throw new Error(response.customerCreate.customerUserErrors[0].message);
      }

      toast.success("Account created successfully. Please login.");
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create account"
      );
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Called when Truecaller returns a verified profile.
   * Creates a Shopify account (or finds existing) and logs the user in.
   */
  async function handleTruecallerVerified(session: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    setIsLoading(true);
    try {
      const email =
        session.email ||
        `tc_${session.phone.replace(/\D/g, "")}@sexuloon.app`;

      // Try creating the account
      const signupRes = (await mutate({
        query: CUSTOMER_CREATE,
        variables: {
          input: {
            firstName: session.firstName || "Truecaller",
            lastName: session.lastName || "User",
            email,
            phone: session.phone,
            password: `TC_${session.phone}_verified`,
            acceptsMarketing: false,
          },
        },
      })) as any;

      // Ignore "already exists" errors — just try to log in
      const hasError = signupRes?.customerCreate?.customerUserErrors?.length > 0;
      const alreadyExists = hasError &&
        signupRes.customerCreate.customerUserErrors.some((e: any) =>
          e.code === "TAKEN" || e.message?.toLowerCase().includes("taken")
        );

      if (hasError && !alreadyExists) {
        throw new Error(signupRes.customerCreate.customerUserErrors[0].message);
      }

      // Log them in
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
        toast.success(
          alreadyExists
            ? `Welcome back, ${session.firstName}! 👋`
            : `Account created! Welcome, ${session.firstName}! 🎉`
        );
        router.push("/");
        return;
      }

      throw new Error("Could not complete Truecaller sign-up");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Truecaller sign-up failed. Please use email."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4"
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
            onNotInstalled={() => {}}
          />
        </div>

        {/* ── OR divider ───────────────────────────────────────────────── */}
        <div className="tc-divider" aria-hidden="true">
          <span className="tc-divider__line" />
          <span className="tc-divider__text">or sign up with email</span>
          <span className="tc-divider__line" />
        </div>

        {/* ── Standard fields ───────────────────────────────────────────── */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
            onClick={() => setShowRegister(false)}
            className="text-sm"
          >
            Already have an account? <b>Login</b>
          </Button>
          <Button type="submit" className="w-1/2" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
