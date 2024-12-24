"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import { ParallaxProvider } from "@/context/Parallax";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";
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
  const [isNavInverted, setIsNavInverted] = useState(false); // nav state

  // If background for page is black, isNavInverted nav color automatically
  useEffect(() => {
    if (background === "black") {
      setIsNavInverted(true);
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
          <Nav
            isInverted={isNavInverted}
            setIsInverted={(newState) => {
              setIsNavInverted(newState);
            }}
          />

          <main>{children}</main>

          <Footer />
        </div>
      </ParallaxProvider>
    </>
  );
};

export default Layout;
