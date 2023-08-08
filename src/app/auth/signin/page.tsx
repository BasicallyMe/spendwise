"use client";

import { useState } from "react";
import Icon from "../../../../public/icons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "../../../firebase/auth";

interface UserDataType {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState({});
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data: UserDataType = {
        email: event.target.email.value,
        password: event.target.password.value,
      };
      const response = await signInWithEmail(data);
      if (response.status === 'success') {
        router.push("/user/dashboard");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div className="h-full w-4/5">
      <h1 className="text-3xl font-semibold">Welcome back</h1>
      <div className="mt-8">
        <p className="text-sm text-slate-400">
          Sign in using one of the providers below
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
      <div className="">
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
              placeholder="*************"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white text-sm w-full py-2 rounded my-6 hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm font-normal">
          Already have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
