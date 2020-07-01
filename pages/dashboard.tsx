import * as React from "react";
import LogoutButton from "../components/LogoutButton";
import { Protected } from "../components/Protected";
import useSWR from "swr";
import { fetcher } from "../lib/utils";

export default function Dashboard(props) {
  const { data } = useSWR("/api/user", fetcher);
  const [linkLabel, setLinkLabel] = React.useState("");
  const [linkUrl, setLinkUrl] = React.useState("");

  React.useEffect(() => {
    data && console.log(data);
  }, [data]);

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
