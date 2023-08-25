"use client"; // since all components are essentially rendered as server components, it prevents from using event handlers

import { useState } from "react";
import Link from "next/link";
import { newUser } from "backend/auth";
import { AlertCircle } from "lucide-react";
import Icon from "../../../../public/icons/icons";
import { createUserDatabase } from "backend/firestore";
import VerifyPage from "./VerifyPage";

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
  const [showVerifyPage, setShowVerifyPage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setShowVerifyPage(true);
      return null;
    }
    if (response.status === "error") {
      // console.log("error", response.message);
      setErrorMessage(response.message);
      setShowError(true);
    }
  };

  if (showVerifyPage) {
    return <VerifyPage />;
  }

  return (
    <div className="h-full w-4/5">
      <h1 className="text-3xl font-semibold">Create your account</h1>
      <div className="mt-8">
        <p className="text-sm text-slate-400">
          Sign up using one of the providers below
        </p>
        <div className="text-sm py-4 flex flex-row">
          <button className="px-2 py-3 rounded border border-slate-200 bg-white grow mr-2 text-center flex flex-row justify-center">
            <Icon icon="Google" />
            <span className="pl-2">Google</span>
          </button>
          <button className="px-2 py-3 rounded border border-slate-200 bg-white grow mr-2 text-center flex flex-row justify-center">
            <Icon icon="Twitter" />
            <span className="pl-2">Twitter</span>
          </button>
          <button className="px-2 py-3 rounded border border-slate-200 bg-white grow text-center flex flex-row justify-center">
            <Icon icon="Microsoft" />
            <span className="pl-2">Microsoft</span>
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
          <div className="flex flex-row items-center py-2 px-2 rounded-sm my-4 bg-orange-400 text-white">
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
            className={`${
              disableBtn ? "bg-slate-400" : "bg-blue-500"
            } text-white text-sm w-full py-2 rounded my-6 ${
              !disableBtn && "hover:bg-blue-600"
            }`}
          >
            Create your account
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
