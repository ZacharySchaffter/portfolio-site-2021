"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import { ParallaxProvider } from "@/components/Parallax";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import clsx from "clsx";

type Props = {
  background?: string;
  isFlush?: Boolean;
};

const Layout: React.FC<PropsWithChildren<Props>> = ({
  background,
  isFlush = false,
  children,
}) => {
  const [invert, setInvert] = useState(false); // nav state

  // If background for page is black, invert nav color automatically
  useEffect(() => {
    if (background === "black") {
      setInvert(true);
    }
  }, [background]);

  return (
    <>
      <ParallaxProvider>
        <div
          className={clsx("layout-wrapper", `bg-${background}`, {
            flush: isFlush,
          })}
        >
          <Nav invert={invert} setInvert={setInvert} />

          <main>{children}</main>

          <Footer />
        </div>
      </ParallaxProvider>
    </>
  );
};

export default Layout;
