import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Loading } from "@/components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ekkn - Trunojoyo</title>
      </Head>
      <Loading />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
