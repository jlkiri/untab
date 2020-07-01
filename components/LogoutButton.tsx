import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const logout = await fetch("/api/logout", {
      method: "POST",
    });

    if (logout.ok) {
      router.push("/");
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
}
