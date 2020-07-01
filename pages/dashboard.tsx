import { GetStaticProps, GetServerSideProps } from "next";
import * as React from "react";
import { parseCookies } from "nookies";
import { NowRequest, NowResponse } from "@vercel/node";
import { Magic } from "@magic-sdk/admin";
import { useUser } from "../hooks/useUser";
import LogoutButton from "../components/LogoutButton";
import { Protected } from "../components/Protected";
import { protect, protectStatic } from "../lib/protect";

export default function Dashboard(props) {
  // const { user, loading } = useUser();
  const [linkLabel, setLinkLabel] = React.useState("");
  const [linkUrl, setLinkUrl] = React.useState("");

  const addLink = async () => {
    console.log(linkLabel, linkUrl);
    const addResponse = await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ label: linkLabel, url: linkUrl }),
    });

    if (addResponse.ok) {
      console.log("success");
      setLinkLabel("");
      setLinkUrl("");
    }
  };

  React.useEffect(() => {
    console.log(props.user);
  }, []);

  return (
    <Protected>
      <h1>Dashboard</h1>
      <LogoutButton />
      <div>
        Add link:
        <input
          type="text"
          value={linkLabel}
          onChange={(e) => setLinkLabel(e.target.value)}
        ></input>
        <input
          type="text"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        ></input>
      </div>
      <button onClick={addLink}>Add</button>
    </Protected>
  );
}

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NowRequest, res: NowResponse, user) => {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  return userMetadata;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const user = await protectStatic(context.req, context.res, cookies, handler);
  return {
    props: {
      user,
    },
  };
};
