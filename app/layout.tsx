import "@/styles/globals.scss";
import { PropsWithChildren } from "react";
import { ParallaxProvider } from "@/context/Parallax";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <ParallaxProvider>{children}</ParallaxProvider>
    </html>
  );
};

export default RootLayout;
