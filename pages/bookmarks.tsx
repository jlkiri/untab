import React, { useEffect } from "react";
/* import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { authorize } from "../lib/protect";
import { parseCookies } from "nookies";
import { getBookmarks } from "../lib/db";
import { Bookmark } from "@prisma/client"; */
import useSWR from "swr";
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

  /* const removeBk = async (id) => {
    const response = await fetch("api/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      console.log(`deleted ${id}`);
      setBks(bks.filter((bk) => bk.id !== id));
    }
  }; */

  if (!data || data.length === 0) return null;

  return (
    <div>
      {data.map((bk) => (
        <div>
          {bk.label} : {bk.url}
          {/* <button onClick={() => removeBk(bk.id)}>remove</button> */}
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
