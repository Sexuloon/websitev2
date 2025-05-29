"use client";
import LoginPage from "@/components/view/Auth/Login/Login";
import SignUpPage from "@/components/view/Auth/Signup/Signup";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

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
    // <div className="min-h-screen w-full overflow-x-hidden bg-white flex items-center justify-center px-4 sm:px-6 md:px-8 py-10">
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-white flex items-center justify-center px-4 sm:px-6 md:px-8 py-10 hide-scrollbar">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
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
