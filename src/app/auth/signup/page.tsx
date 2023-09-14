"use client"; // since all components are essentially rendered as server components, it prevents from using event handlers

import { useState } from "react";
import Link from "next/link";
import { newUser } from "backend/auth";
import { AlertCircle } from "lucide-react";
import Icon from "../../../../public/icons/icons";
import { createUserDatabase } from "backend/firestore";
import { useRouter } from "next/navigation";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserDataType {
  firstName: string;
  lastName: string;
  uid: string;
  email: string;
}

export default function SignUp() {
  const [disableBtn, setDisableBtn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisableBtn(true);
    let data: UserFormData = {
      firstName: event.target.first.value.trim(),
      lastName: event.target.last.value.trim(),
      email: event.target.email.value.trim(),
      password: event.target.password.value,
    };

    const response = await newUser(data);
    if (response.status === "success") {
      let user: UserDataType = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        uid: response.user.uid,
      };
      await createUserDatabase(user);
      return router.push('/auth/verify');
    }
    if (response.status === "error") {
      setErrorMessage(response.message);
      setShowError(true);
      setDisableBtn(false);
    }
  };

  return (
    <div className="h-full w-4/5">
      <h1 className="text-3xl font-semibold">Create your account</h1>
      <div className="mt-4">
        <p className="text-sm text-slate-400">
          Sign up using one of the providers below
        </p>
        <div className="text-sm py-4 flex flex-col">
          <button className="px-2 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-100 transition-colors duration-300 grow text-center flex flex-row justify-center">
            <Icon icon="Google" />
            <span className="pl-2">Sign up with Google</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="bg-slate-200 grow h-px"></div>
        <p className="px-2 text-sm text-slate-400">or</p>
        <div className="bg-slate-200 grow h-px"></div>
      </div>
      <div className="mt-2">
        {showError && (
          <div className="flex flex-row items-center py-2 px-2 rounded-sm my-4 bg-red-500 text-white">
            <AlertCircle size={20} />
            <p className="text-sm ml-2">{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-row">
            <div className="flex flex-col grow mr-3">
              <label htmlFor="first" className="text-sm font-medium mb-1">
                First name
              </label>
              <input
                className="border rounded text-xs py-2 pl-1 font-normal focus:border-slate-200 focus:border-2 focus-visible:outline-0"
                name="first"
                type="text"
                id="first"
                required
                placeholder="Jane"
              />
            </div>
            <div className="flex flex-col grow">
              <label htmlFor="first" className="text-sm font-medium mb-1">
                Last name
              </label>
              <input
                name="last"
                type="text"
                id="last"
                required
                placeholder="Doe"
                className="border rounded text-xs py-2 pl-1 font-normal focus:border-slate-200 focus:border-2 focus-visible:outline-0"
              />
            </div>
          </fieldset>
          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
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
              name="password"
              onChange={() => setShowError(false)}
              required
              placeholder="*************"
            />
          </div>
          <button
            type="submit"
            disabled={disableBtn}
            className="text-white flex flex-row justify-center text-sm w-full py-2 rounded my-6 bg-green-500"
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
              "Create your account"
            )}
          </button>
        </form>
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-500 hover:text-blue-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
