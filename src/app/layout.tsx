"use client";
// Metadata object is used to set Metadata for the whole page
import { Metadata } from "next";

import { AuthContextProvider } from "context/AuthContext";

// import FontSource font
import "@fontsource-variable/inter";

// importing global styles where tailwind classes are injected
import "../styles/global.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "An app to track all your expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
