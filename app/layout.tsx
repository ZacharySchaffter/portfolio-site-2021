import "styles/globals.scss";
import Layout from "@/components/Layout";
import { PropsWithChildren } from "react";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default RootLayout;
