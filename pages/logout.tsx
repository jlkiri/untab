import { useRouter } from "next/router";
import * as React from "react";
import { AuthContext } from "./_app";

export default function Logout() {
  const router = useRouter();
  const { isLoggedIn, onLogout } = React.useContext(AuthContext);

  const logout = async () => {
    if (isLoggedIn) {
      await fetch("/api/logout", {
        method: "POST",
      });
      onLogout();
    }
  };

  React.useEffect(() => {
    logout();
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return null;
}
