import { RedirectError } from "../lib/error";

const Error = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  if (err instanceof RedirectError) {
    res.writeHead(err.statusCode, { Location: encodeURI(err.url) });
    res.end();
  }
  return {};
};

export default Error;
