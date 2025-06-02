"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Adjust paths relative to /hoc/withAuth.js
import { useAuthStore } from "../store/useAuthStore";
import { auth, onAuthStateChanged } from "../lib/firebase";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
      // Listen to Firebase auth state change
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // User is logged in, update Zustand store
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });
        } else {
          // User not logged in, redirect to homepage
          setUser(null);
          router.push("/");
        }
      });

      return () => unsubscribe();
    }, [router, setUser]);

    // Optional: show nothing or loading if user state not ready
    if (!user) {
      return null; // or a loading spinner if you want
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
