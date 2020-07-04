import * as React from "react";
import { Page } from "../../components/Page";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { authorize } from "../../lib/protect";
import { RedirectError } from "../../lib/error";

export default function DashboardAdd(props) {
  return <Page title="dashboard"></Page>;
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
