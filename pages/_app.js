import AOS from "aos";
import Head from "next/head";
import { useEffect } from "react";

import "aos/dist/aos.css";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/selectbox.css";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
    const location = useRouter();
    useEffect(() => {
        if (location.pathname === "/home-two") {
            document.body.classList.add("home-two");
        } else if (location.pathname === "/home-four") {
            document.body.classList.add("home-four");
        } else if (location.pathname === "/") {
            document.body.classList.remove("home-two");
            document.body.classList.add("home-one");
        }
        document.body.classList.add("home-one");
        return () => {
            document.body.classList.remove("home-two");
            document.body.classList.remove("home-four");
            document.body.classList.add("home-one");
        };
    }, [location.pathname]);
  return (
    <>
      <Head>
        <title>DotTech | Multivendor E-commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
