export const Page = ({ children, title }) => {
  return (
    <main>
      <h1>{title}</h1>
      <div>{children}</div>
    </main>
  );
};
