import * as React from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../lib/utils";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { authorize } from "../../lib/protect";
import { parseCookies } from "nookies";
import { RedirectError } from "../../lib/error";
import { Page } from "../../components/Page";
import { Input } from "../../components/Input";

export default function Dashboard(props) {
  const bms = useSWR("/api/bookmark_count", fetcher);
  const [linkLabel, setLinkLabel] = React.useState("");
  const [linkUrl, setLinkUrl] = React.useState("");
  const [inputInvalid, setInputInvalid] = React.useState("");
  const [isBusy, setIsBusy] = React.useState(false);

  const addLink = async () => {
    setIsBusy(true);

    if (!/^http/.test(linkUrl)) {
      setInputInvalid("Please enter a valid URL");
      setIsBusy(false);
      return;
    }

    const addResponse = await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ label: linkLabel, url: linkUrl, count: bms.data }),
    });

    if (addResponse.ok) {
      await mutate("/api/bookmark_count");

      const data = await addResponse.json();

      setLinkLabel("");
      setLinkUrl("");
      setInputInvalid("");

      if (data.isLimit) {
        return;
      }

      setIsBusy(false);
    }
  };

  if (bms.data == null) return null;

  return (
    <Page title="Dashboard">
      <section className="py-6">
        <h2 className="font-bold text-2xl py-1 text-center">
          Add a URL to bookmarks
        </h2>
        <div className="md:space-x-6 space-y-4 md:space-y-0 px-6 py-2 flex flex-col justify-center md:flex-row">
          <Input
            isValid={!inputInvalid}
            type="text"
            name="label"
            placeholder="Label"
            value={linkLabel}
            onChange={(e) => setLinkLabel(e.target.value)}
          ></Input>
          <Input
            isValid={!inputInvalid}
            type="text"
            name="url"
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          ></Input>
          <button
            disabled={isBusy || bms.data >= 50}
            onClick={addLink}
            className="p-2 px-6 hover:bg-blue-600 duration-200 rounded-full text-white font-bold bg-blue-800"
          >
            Add
          </button>
        </div>
        <div className="text-center text-red-600 font-bold">{inputInvalid}</div>
      </section>
      <section className="py-6 space-y-4 text-center">
        <Link href="/dashboard/read">
          <a className="inline-block text-xl justify-centertext-center font-bold p-4 px-8 sm:px-12 rounded-full bg-blue-800 text-white duration-100 hover:bg-blue-900">
            Read saved bookmarks
          </a>
        </Link>
        <div className="font-bold text-sm align-baseline text-gray-700">
          <span>You have </span>
          <Counter key={bms.data} amount={bms.data} />
          <span> bookmark{bms.data === 1 ? "" : "s"}</span>
        </div>
      </section>
    </Page>
  );
}

const Counter = ({ amount }) => {
  return <span className="slide text-2xl inline-block">{amount}</span>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  try {
    const user = await authorize(cookies);
  } catch (e) {
    if (process.env.NODE_ENV === "production") {
      throw new RedirectError(302, "/login");
    } else {
      ctx.res.writeHead(302, { Location: encodeURI("/login") });
      ctx.res.end();
    }
  }
  return { props: {} };
};
