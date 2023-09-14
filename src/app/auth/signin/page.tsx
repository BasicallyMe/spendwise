"use client";

import { useState } from "react";
import Icon from "../../../../public/icons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "backend/auth";
import { AlertCircle } from "lucide-react";

interface UserDataType {
  email: string;
  password: string;
}

export default function SignIn() {
  const [disableBtn, setDisableBtn] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const handleSubmit = async (event) => {
    setDisableBtn(true);
    event.preventDefault();
    const data: UserDataType = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const response = await signInWithEmail(data);
    if (response.status === "success") {
      if (response.verified) {
        router.push("/user/dashboard");
      } else {
        setErrorMessage("Please verify your email to sign in to your account.");
        setShowError(true);
      }
    } else {
      setErrorMessage(response.message);
      setShowError(true);
    }
    if (response.status !== "success") {
      setErrorMessage(response.message);
      setShowError(true);
      setDisableBtn(false);
      return setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    if (!response.verified) {
      setErrorMessage("Please verify your email to sign in to your account");
      setShowError(true);
      setDisableBtn(false);
      return setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    router.push("/user/dashboard");
    setDisableBtn(false);
  };

  return (
    <div className="h-full w-4/5">
      <h1 className="text-3xl font-semibold">Welcome back</h1>
      <div className="mt-8">
        <p className="text-sm text-slate-400">
          Sign in using one of the providers below
        </p>
        <div className="text-sm py-4 flex flex-col">
          <button className="px-2 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-100 transition-colors duration-300 grow text-center flex flex-row justify-center">
            <Icon icon="Google" />
            <span className="pl-2">Sign in with Google</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="bg-slate-200 grow h-px"></div>
        <p className="px-2 text-sm text-slate-400">or</p>
        <div className="bg-slate-200 grow h-px"></div>
      </div>
      <div className="">
        {showError && (
          <div className="flex flex-row items-center py-2 px-2 rounded my-4 bg-red-500 text-white">
            <AlertCircle size={20} />
            <p className="text-sm ml-2">{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email address
            </label>
            <input
              className="border rounded text-xs py-2 pl-1 focus:border-slate-200 focus:border-2 focus-visible:outline-0"
              type="email"
              id="email"
              name="email"
              required
              onChange={() => setShowError(false)}
              placeholder="janedoe@example.com"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              Password
            </label>
            <input
              className="border rounded text-xs py-2 pl-1 focus:border-slate-200 focus:border-2 focus-visible:outline-0"
              type="password"
              id="password"
              onChange={() => setShowError(false)}
              required
              name="password"
              placeholder="*************"
            />
          </div>
          <button
            type="submit"
            disabled={disableBtn}
            className="text-white text-sm w-full transition-colors py-2 rounded my-6 bg-green-500 hover:bg-green-600 flex flex-row justify-center"
          >
            {disableBtn ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p className="text-sm font-normal">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-500 hover:text-green-600 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
