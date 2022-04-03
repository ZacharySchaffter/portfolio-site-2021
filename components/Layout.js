// Next.js Components
import Head from "next/head";
import { useEffect, useState } from "react";

// Site components
import { ParallaxProvider } from "components/Parallax";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";

export default ({
  title,
  description,
  background,
  flush = false,
  children,
}) => {
  const [invert, setInvert] = useState(false); // nav state

  const metaTitle = title || "Zachary Schaffter | Front-End Developer";
  const metaDesc =
    description || "Creative Front-End Developer based in Seattle, WA";

  // If background for page is black, invert nav color automatically
  useEffect(() => {
    if (background === "black") {
      setInvert(true);
    }
  }, [background]);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        {/* TODO: Replace with contentful */}
        <meta name="description" content={metaDesc} />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
      </Head>

      <ParallaxProvider>
        <div
          className={`layout-wrapper ${flush ? "flush" : ""} bg-${background}`}
        >
          <Nav invert={invert} setInvert={setInvert} />

          <main>{children}</main>

          <Footer />
        </div>
      </ParallaxProvider>
    </>
  );
};
