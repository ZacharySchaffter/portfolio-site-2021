import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import { PropsWithChildren } from "react";
import { ParallaxProvider } from "@/context/Parallax";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body>
        <ParallaxProvider>
          <Layout>{children}</Layout>
        </ParallaxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
