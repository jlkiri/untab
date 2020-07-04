import { H1 } from "./H1";

export const Page = ({ children, title }) => {
  return (
    <main className="max-w-xl border border-red-500 m-auto flex flex-col items-stretch justify-center">
      <H1>{title}</H1>
      <div>{children}</div>
    </main>
  );
};
