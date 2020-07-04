import * as React from "react";
import LogoutButton from "../../components/LogoutButton";
import { Protected } from "../../components/Protected";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../lib/utils";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { authorize } from "../../lib/protect";
import { parseCookies } from "nookies";
import { RedirectError } from "../../lib/error";
import { Page } from "../../components/Page";
import { StyledLink } from "../../components/StyledLink";
import { Input } from "../../components/Input";

const Read = () => {
  const bms = useSWR("/api/bookmarks", fetcher);

  const removeBookmark = async (id) => {
    const response = await fetch("api/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      mutate("/api/bookmarks");
      console.log(`Deleted ${id}`);
    }
  };
};

export default function Dashboard(props) {
  const user = useSWR("/api/user", fetcher);
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

  React.useEffect(() => {
    user.data && console.log(user.data);
  }, [user]);

  return (
    <Page title="Dashboard">
      <section className="py-6">
        <h2 className="font-bold text-2xl py-1 text-center">
          Add a URL to bookmarks
        </h2>
        <div className="px-6 py-2 flex justify-evenly">
          <button className="p-2 rounded-lg bg-purple-800 text-white font-bold">
            Add +
          </button>
          <Input
            type="text"
            name="label"
            placeholder="Label"
            value={linkLabel}
            onChange={(e) => setLinkLabel(e.target.value)}
          ></Input>
          <Input
            type="text"
            name="url"
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          ></Input>
        </div>
      </section>
      <Link href="/dashboard/read">
        <a>
          <StyledLink>Read</StyledLink>
        </a>
      </Link>
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
