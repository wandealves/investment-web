"use client";

import useAuth from "@/hooks/useAuth";

export default function Home() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <h2>Home</h2>
    </>
  );
}
