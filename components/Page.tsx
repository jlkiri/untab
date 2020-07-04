import { H1 } from "./H1";

export const Page = ({ children, title }) => {
  return (
    <main className="pt-4 max-w-4xl m-auto flex flex-col items-stretch justify-center">
      <H1>{title}</H1>
      <div className="rounded-lg">{children}</div>
    </main>
  );
};
