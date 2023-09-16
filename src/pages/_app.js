import "~/styles/globals.css";

import Head from "next/head";
import Mantine from "~/Mantine";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Mantine>
        <Component {...pageProps} />
      </Mantine>
    </>
  );
}
