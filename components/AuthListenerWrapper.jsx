"use client";

import { useEffect } from "react";
import useUserStore from "../store/useUserStore";

export default function AuthListenerWrapper() {
  const initializeAuthListener = useUserStore((state) => state.initializeAuthListener);

  useEffect(() => {
    initializeAuthListener();
  }, [initializeAuthListener]);

  return null;
}
