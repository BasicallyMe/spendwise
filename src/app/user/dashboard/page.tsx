"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
    <div className="h-full">
      {/* <div className="py-3">
        <button className="text-sm text-white rounded-md bg-green-500 py-2 px-5" onClick={() => router.push('/user/add-transaction')}>Add transaction</button>
      </div> */}
      <div className="w-full my-3 py-3 px-2">
        <div className="">
          <h2 className="text-2xl font-semibold">Hello, {user?.displayName.split(" ")[0]}</h2>
          <span className="text-sm text-green-500">We're still designing the perfect dashboard for you...</span>
        </div>
      </div>
    </div>
  );
}
