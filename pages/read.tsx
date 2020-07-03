import React, { useEffect } from "react";
/* import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { authorize } from "../lib/protect";
import { parseCookies } from "nookies";
import { getBookmarks } from "../lib/db";
import { Bookmark } from "@prisma/client"; */
import useSWR, { mutate } from "swr";
import { fetcher } from "../lib/utils";

/* type BookmarkProps = {
  bookmarks?: Bookmark[];
  error?: any;
};

export const getServerSideProps: GetServerSideProps<BookmarkProps> = async (
  context
) => {
  const cookies = parseCookies(context);
  let user;

  try {
    user = authorize(cookies);
  } catch {
    return {
      props: {
        error: "NOT_AUTHORIZED",
      },
    };
  }

  const bookmarks = await getBookmarks(user);
  return {
    props: {
      bookmarks,
    },
  };
}; */

const Bookmarks = () => {
  const { data, error } = useSWR("/api/bookmarks", fetcher);

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

  if (!data || data.length === 0) return null;

  return (
    <div>
      {data.map((bookmark) => (
        <div>
          {bookmark.label} : {bookmark.url}
          {
            <button
              onClick={() => {
                removeBookmark(bookmark.id);
              }}
            >
              remove
            </button>
          }
        </div>
      ))}
      <button>REMOVE IT</button>
      <button>Next</button>
    </div>
  );
};

export default Bookmarks;
