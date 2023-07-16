import React from "react";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex flex-row">
      <div className="w-1/2 bg-slate-300"></div>
      <div className="w-1/2 py-8 px-8 flex justify-center">{children}</div>
    </section>
  );
}
