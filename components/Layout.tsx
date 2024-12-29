import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";
import contentful from "@/services/contentful";

type Props = {
  bgColor?: "dark" | "light" | "static";
};

const getNavItems = async () => {
  try {
    const res = await contentful.getContentByHandle(
      "navigationMenu",
      "header-nav"
    );
    return (
      res?.fields?.items?.map((item) => ({
        label: item.fields.label,
        link: item.fields.link,
      })) || []
    );
  } catch (err) {
    console.error("error fetching header-nav from cms");
  }
  return [];
};

const Layout = async ({
  bgColor,
  children,
}: PropsWithChildren<Props>): Promise<ReactNode> => {
  const navItems = await getNavItems();

  return (
    <div
      className={clsx("layout-wrapper", bgColor && `bg-${bgColor}`)}
      data-invert-header={bgColor === "dark"}
    >
      <Nav items={navItems} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
