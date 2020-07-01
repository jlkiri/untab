import React, { useEffect } from "react";
import useSWR from "swr";

const Bookmarks: React.FC = () => {
  const [bks, setBks] = React.useState([]);

  const removeBk = async (id) => {
    const response = await fetch("api/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      console.log(`deleted ${id}`);
      setBks(bks.filter((bk) => bk.id !== id));
    }
  };

  const fetchBookmarks = async () => {
    const response = await fetch("/api/bookmarks");
    const bs = await response.json();
    console.log(bs);
    setBks(bs);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (bks.length === 0) return null;

  return (
    <div>
      {bks.map((bk) => (
        <div>
          {bk.label} : {bk.url}
          <button onClick={() => removeBk(bk.id)}>remove</button>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
