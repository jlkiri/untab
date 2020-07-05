import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import * as React from "react";
import { AuthContext } from "./_app";
import { Page } from "../components/Page";
import { Input } from "../components/Input";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [isBusy, setIsBusy] = React.useState(false);
  const { isLoggedIn, onLogin } = React.useContext(AuthContext);

  const handleLogin = async (event) => {
    setIsBusy(true);

    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email });

    console.log(did);

    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      if (!isLoggedIn) {
        onLogin();
        setEmail("");
        setIsBusy(false);
      }

      router.push("/dashboard");
    }
  };

  return (
    <Page title="Login">
      <section className="space-y-4 px-4 sm:px-32 lg:px-48 py-6 flex flex-col">
        <h2 className="text-center font-bold text-xl">
          Get one-time login link
        </h2>
        <Input
          class="p-4 rounded-full"
          disabled={isBusy}
          isValid={true}
          type="text"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <button
          disabled={isBusy}
          onClick={handleLogin}
          className="p-4 px-6 text-xl hover:bg-blue-600 duration-200 rounded-full text-white font-bold bg-blue-800  "
        >
          Send
        </button>
      </section>
    </Page>
  );
}
