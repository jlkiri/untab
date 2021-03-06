import * as React from "react";
import { Page } from "../../components/Page";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { authorize } from "../../lib/protect";
import { RedirectError } from "../../lib/error";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../lib/utils";

export default function Read() {
  const { data: bookmarks } = useSWR("/api/bookmarks", fetcher);
  const [isBusy, setIsBusy] = React.useState(false);

  const removeBookmark = async (id) => {
    setIsBusy(true);
    const response = await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      await mutate("/api/bookmarks");
      setIsBusy(false);
    }
  };

  if (!bookmarks) return null;

  if (bookmarks.length === 0)
    return (
      <Page title="Dashboard">
        <section className="py-6">
          <div className="text-center text-2xl font-bold">
            You have no bookmarks!
          </div>
        </section>
      </Page>
    );

  const url = bookmarks[0].url;
  const label = bookmarks[0].label;
  const id = bookmarks[0].id;

  return (
    <Page title="Dashboard">
      <section className="space-y-4 py-6">
        <div className="text-center font-bold text-blue-700">
          {bookmarks.length} bookmark{bookmarks.length === 1 ? "" : "s"}
        </div>
        <div className=" text-center">
          <h2 className="font-bold text-xl">{label}</h2>
          <span className="text-sm text-gray-500">{new URL(url).hostname}</span>
        </div>
        <div className="p-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <a
            onClick={() => {
              if (isBusy) return;
              removeBookmark(id);
            }}
            className="text-center font-bold p-4 px-12 rounded-full bg-blue-800 text-white duration-100 hover:bg-blue-900"
            href={url}
            target="_blank"
          >
            Read
          </a>
          <button
            disabled={isBusy}
            className="font-bold p-4 px-12 rounded-full bg-red-700 text-white duration-100 hover:bg-red-500"
            onClick={() => removeBookmark(id)}
          >
            Skip and remove
          </button>
        </div>
      </section>
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
