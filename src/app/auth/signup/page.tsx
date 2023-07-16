"use client"; // since all components are essentially rendered as server components, it prevents from using event handlers
import Icon from "../../../../public/icons/icons";
import { newUser } from '../../../firebase/auth';
import Link from "next/link";

interface UserDataType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data: UserDataType = {
      firstName: event.target.first.value,
      lastName: event.target.last.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const user = await newUser(data);
    console.log(user);
    
  };

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
      <div className="py-4">
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
            Sign Up
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
