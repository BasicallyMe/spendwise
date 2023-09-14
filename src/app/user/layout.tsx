"use client";
import React from "react";
import { useAuthContext } from "context/AuthContext";
import { TransactionContextProvider } from "context/TransactionContext";
import NavSideBar from "./components/NavSideBar";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();

  return (
    <main className="flex flex-row h-full">
      <NavSideBar />
      <div className="w-4/5 ml-twenty px-3">
        <TransactionContextProvider user={user}>
          {children}
        </TransactionContextProvider>
      </div>
    </main>
  );
}
