"use client";
// AuthBottomSheet is now a thin redirect to AuthModal.
// All logic moved to AuthModal to remove Clerk dependency.
export { default } from "@/components/view/Auth/AuthModal";
