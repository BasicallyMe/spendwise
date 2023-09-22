"use client";
import React, { useEffect } from "react";
import { AuthContextProvider } from "context/AuthContext";
import { useAuthContext } from "context/AuthContext";
import { useRouter } from "next/navigation";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <BaseContainer>{children}</BaseContainer>
    </AuthContextProvider>
  );
}

function BaseContainer({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      return router.replace("/auth/signin", { scroll: false });
    }
    if (!user.emailVerified) {
      return router.replace("/auth/verify", { scroll: false });
    }
  }, []);
  return <>{children}</>;
}
