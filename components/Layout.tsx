"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import clsx from "clsx";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";

type Props = {
  bgColor?: "dark" | "light" | "static";
};

const Layout: React.FC<PropsWithChildren<Props>> = ({ bgColor, children }) => {
  const [isNavInverted, setIsNavInverted] = useState(bgColor === "dark"); // nav state

  useEffect(() => {
    if (bgColor === "dark") setIsNavInverted(true);
  }, [bgColor]);

  return (
    <>
      <div className={clsx("layout-wrapper", bgColor && `bg-${bgColor}`)}>
        <Nav
          isInverted={isNavInverted}
          setIsInverted={(newState) => {
            setIsNavInverted(newState);
          }}
        />

        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
