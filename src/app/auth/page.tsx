"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import SignUpPage from "@/components/view/Auth/Signup/Signup";
import LoginPage from "@/components/view/Auth/Login/Login";

const Auth = () => {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  const cookies = parseCookies();
  const customerAccessToken = cookies.customerAccessToken;

  useEffect(() => {
    if (customerAccessToken) {
      router.push("/");
    }
  }, [customerAccessToken, router]);

  return (
    <div className="">
      <div className="">
        {/* <Logo /> */}
        {showRegister ? (
          <SignUpPage setShowRegister={setShowRegister} />
        ) : (
          <LoginPage setShowRegister={setShowRegister} />
        )}
      </div>
    </div>
  );
};

export default Auth;
