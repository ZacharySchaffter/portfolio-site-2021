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
    <body className={clsx("layout-wrapper", bgColor && `bg-${bgColor}`)}>
      <div>
        <Nav
          isInverted={isNavInverted}
          setIsInverted={(newState) => {
            setIsNavInverted(newState);
          }}
        />

        <main>{children}</main>

        <Footer />
      </div>
    </body>
  );
};

export default Layout;
