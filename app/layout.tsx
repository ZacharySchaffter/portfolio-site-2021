import "@/styles/globals.scss";
import { PropsWithChildren } from "react";
import { ParallaxProvider } from "@/context/Parallax";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body>
        <ParallaxProvider>{children}</ParallaxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
