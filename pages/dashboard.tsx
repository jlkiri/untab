import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      console.log(user);
    }
  }, [loading]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
