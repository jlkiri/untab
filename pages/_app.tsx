import { AppProps } from "next/app";
import Link from "next/link";

const Header = () => (
  <header>
    <Link href="/">
      <a>home</a>
    </Link>
    <Link href="/dashboard">
      <a>dashboard</a>
    </Link>
    <Link href="/read">
      <a>read</a>
    </Link>
  </header>
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
