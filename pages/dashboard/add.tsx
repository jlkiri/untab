import * as React from "react";
import { Page } from "../../components/Page";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { authorize } from "../../lib/protect";
import { RedirectError } from "../../lib/error";

export default function DashboardAdd(props) {
  const [linkLabel, setLinkLabel] = React.useState("");
  const [linkUrl, setLinkUrl] = React.useState("");

  const addLink = async () => {
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

  return (
    <Page title="dashboard">
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
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  try {
    await authorize(cookies);
  } catch {
    if (process.env.NODE_ENV === "production") {
      throw new RedirectError(302, "/login");
    } else {
      ctx.res.writeHead(302, { Location: encodeURI("/login") });
      ctx.res.end();
    }
  }
  return { props: {} };
};
