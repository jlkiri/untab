import Link from "next/link";
import Head from "next/head";
import { WelcomeImg } from "../components/WelcomImg";

export default function Home() {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('authed=true')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        ></script>
      </Head>
      <main className="flex pt-24 flex-col-reverse items-center md:px-24 xl:items-start xl:flex-row xl:px-40 justify-between">
        <div>
          <WelcomeImg />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="whitespace-no-wrap text-center sm:text-left text-3xl sm:text-5xl font-extrabold">
            Welcome to Untab!
          </h1>
          <p className="mt-2 text-center">
            A brain-friendly alternative to open tabs and bookmarks.
          </p>
          <a
            href="/login"
            className="mt-8 p-4 px-8 gradient-button rounded-full text-white font-bold text-xl"
          >
            Get started!
          </a>
        </div>
      </main>
    </>
  );
}
