import useSWR from "swr";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if (document.cookie && document.cookie.includes("authed")) {
        setIsLoggedIn(true);
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  return isLoggedIn;
}
