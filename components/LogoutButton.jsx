// components/home/LogoutButton.jsx
"use client";

import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import useUserStore from "../../store/useUserStore";

export default function LogoutButton() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert(`Logged out: ${user?.email}`); // Show email after logout
      clearUser();  // clear Zustand user state
      router.push("/");  // Redirect to sign-in page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
