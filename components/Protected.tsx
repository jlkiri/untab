import Head from "next/head";

export const Protected: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('authed')) {
                window.location.href = "/login"
              }
            `,
          }}
        ></script>
      </Head>
      {children}
    </>
  );
};
