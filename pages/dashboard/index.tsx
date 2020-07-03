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

  React.useEffect(() => {
    user.data && console.log(user.data);
  }, [user]);

  return (
    <Page title="dashboard">
      <div>nothing here yet</div>
      <Link href="/dashboard/add">
        <a>Add</a>
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
