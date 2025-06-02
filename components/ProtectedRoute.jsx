"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "../store/useUserStore";

export default function ProtectedRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to sign-in page if not logged in
    }
  }, [user, router]);

  if (!user) {
    // Optionally, you can show a loading or empty screen while redirecting
    return <p>Redirecting to sign in...</p>;
  }

  return <>{children}</>;
}
