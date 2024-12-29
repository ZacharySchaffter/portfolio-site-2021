import { PropsWithChildren } from "react";
import clsx from "clsx";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";

type Props = {
  bgColor?: "dark" | "light" | "static";
};

const Layout: React.FC<PropsWithChildren<Props>> = ({ bgColor, children }) => {
  return (
    <div
      className={clsx("layout-wrapper", bgColor && `bg-${bgColor}`)}
      data-invert-header={bgColor === "dark"}
    >
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
