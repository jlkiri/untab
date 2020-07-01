import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import { Protected } from "../components/Protected";

export default function Dashboard() {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      console.log(user);
    }
  }, [loading]);

  return (
    <Protected>
      <h1>Dashboard</h1>
      <LogoutButton />
    </Protected>
  );
}
