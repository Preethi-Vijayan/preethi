// /store/useUserStore.js
import create from "zustand";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useUserStore = create((set) => {
  let hasInitialized = false; 

  const initializeAuthListener = () => {
    if (hasInitialized) return;
    hasInitialized = true;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
        });
      } else {
        set({ user: null });
      }
    });
  };

  return {
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    initializeAuthListener, // expose panrom
  };
});

export default useUserStore;
