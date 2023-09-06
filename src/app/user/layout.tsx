"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "context/AuthContext";
import { TransactionContextProvider } from "context/TransactionContext";
import { useRouter } from "next/navigation";
import NavSideBar from "./components/NavSideBar";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.replace("/auth/signin");
  }, []);

  return (
    <main className="flex flex-row h-full">
      <NavSideBar />
      <div className="w-full">
        <TransactionContextProvider user={user}>
          {children}
        </TransactionContextProvider>
      </div>
    </main>
  );
}
