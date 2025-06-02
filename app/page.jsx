// app/page.jsx
"use client";

import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import useUserStore from "../store/useUserStore";

export default function Home() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();  // Create provider here
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
      router.push("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome! Please Sign In</h1>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
}
