import type { AppProps } from "next/app";
import "../styles/globals.css";

import { NextSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";

import "@fontsource/jost/400.css"
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css"
import "@fontsource/jost/700.css"
import "@fontsource/sen/400.css"
import "@fontsource/sen/700.css";

function play() {
var audio = new Audio('lagu1.mp3');audio.loop=true;audio.play();}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <NextSeo
        title="KOI | HuTao Simp ♡"
        titleTemplate="KOI"
        defaultTitle="KOI | HuTao Simp ♡"
        description="Hey! I'm KOI, Let's Be Friends :3"
        openGraph={{
          url: "https://ikankoi.my.id/",
          title: "KOI | HuTao Simp ♡",
          description:
            "Hey! I'm KOI, Let's Be Friends :3",
          images: [
            {
              url: "https://telegra.ph/file/fb8741aabb9d25e2fcdb4.jpg",
              alt: "KOI | HuTao Simp ♡",
            },
          ],
        }}
        twitter={{
          handle: "@neekoi_",
          site: "@neekoi_",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "koi, open source",
          },
        ]}
      />
      <Head>
        <link rel="icon" type="image/png" href="/pwa-512x512.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
