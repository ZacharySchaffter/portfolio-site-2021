import "@/styles/globals.scss";
import { PropsWithChildren } from "react";
import { ParallaxProvider } from "@/context/Parallax";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Zachary Schaffter | %s",
    default: "Zachary Schaffter | Frontend Software Engineer", // a default is required when creating a template
  },
};

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
