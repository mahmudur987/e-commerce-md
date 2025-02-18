import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import CartProvider from "../src/context/CartContext";
import { CompareProvider } from "../src/context/CompareContext";
import { WishlistProvider } from "../src/context/WishListContext";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/selectbox.css";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>DotTech </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.png" />
          </Head>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <Component {...pageProps} />
                <Toaster />
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
