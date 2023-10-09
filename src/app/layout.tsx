// Metadata object is used to set Metadata for the whole page
import React from "react";
import BaseLayout from "./baselayout";

// import FontSource font
import "@fontsource-variable/inter";

// importing global styles where tailwind classes are injected
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SpendWise</title>
        <link rel="icon" href="/public/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta
          name="description"
          content="Track your expenses effortlessly with SpendWise, a powerful expense management platform. Gain insights into your spending habits, categorize expenses, and take control of your finances today."
        />
      </head>
      <body className="h-screen">
          <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
