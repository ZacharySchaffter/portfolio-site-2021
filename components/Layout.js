// Next.js Components
import Head from "next/head";
import { useState } from "react";

// Site components
import { ParallaxProvider } from "/components/Parallax";
import Nav from "/components/Nav/Nav";
import Footer from "/components/Footer/Footer";

export default ({ title, description, children }) => {
  const [invertHeader, setInvertHeader] = useState(false);
  const metaTitle = title || "Zachary Schaffter | Front-End Developer";
  const metaDesc =
    description || "Creative Front-End Developer based in Seattle, WA";
  return (
    <ParallaxProvider>
      <div className="">
        {/*
      =========================
      HEAD
      =========================
      */}
        <Head>
          <title>{metaTitle}</title>
          {/* TODO: Replace with contentful */}
          <meta name="description" content={metaDesc} />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/*
        =========================
        NAV
        =========================
        */}
        <Nav />

        {/*
        =========================
        BODY
        =========================
        */}
        <main className="">{children}</main>

        {/*
      =========================
      FOOTER
      =========================
      */}
        <Footer />
      </div>
    </ParallaxProvider>
  );
};
