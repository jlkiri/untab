import "./style.css";
import { AppProps } from "next/app";
import Link from "next/link";
import * as React from "react";

const Header = ({ isLoggedIn }) => {
  return (
    <header className="bg-white shadow-sm flex justify-between">
      <div className="py-4">
        <div className="bg-black w-8 h-8 mx-4"></div>
      </div>
      <nav>
        <Link passHref href="/dashboard">
          <a className="inline-block py-4 px-2 sm:px-8 font-bold text-xl sm:text-2xl hover:opacity-75 hover:text-blue-500">
            <span className="text-blue-700">d</span>ashboard
          </a>
        </Link>
        <Link href="/about">
          <a className="inline-block py-4 px-2 sm:px-8 font-bold text-xl sm:text-2xl hover:opacity-75 hover:text-blue-500">
            <span className="text-blue-700">a</span>bout
          </a>
        </Link>
        {isLoggedIn ? (
          <Link href="/logout">
            <a className="inline-block py-4 px-2 sm:px-8 font-bold text-xl sm:text-2xl hover:opacity-75 hover:text-blue-500">
              <span className="text-purple-700">l</span>ogout
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="inline-block py-4 px-2 sm:px-8 font-bold text-xl sm:text-2xl hover:opacity-75 hover:text-blue-500">
              <span className="text-purple-700">l</span>ogin
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
};

export const AuthContext = React.createContext({
  onLogout: () => {},
  isLoggedIn: false,
});

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const onLogout = () => setIsLoggedIn(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.cookie && document.cookie.includes("authed")) {
        setIsLoggedIn(true);
      }
    }
  });

  return (
    <AuthContext.Provider value={{ onLogout, isLoggedIn }}>
      <Header isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
    </AuthContext.Provider>
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
