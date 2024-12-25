import { ReactNode } from "react";
import contentful from "@/services/contentful";
import SideBySide from "@/components/SideBySide/SideBySide";
import { ISideBySide } from "@/types/__generated__/contentful";
import Layout from "@/components/Layout";

const AboutPage = async (): Promise<ReactNode> => {
  let sideBySide: ISideBySide | undefined;
  try {
    sideBySide = await contentful.getContentByHandle(
      "sideBySide",
      "sbs-about-me"
    );
  } catch (err) {
    console.log("error fetching sms-about-me module:", err);
    throw new Error("failed to retrieve about me module");
  }

  const { title, copyText, image, showSocial } = sideBySide?.fields || {};
  const imageSrc = image?.fields?.file?.url;
  const { width, height } = image?.fields?.file?.details?.image || {
    width: 0,
    height: 0,
  };
  const aspectRatio = width / height;

  return (
    <Layout bgColor="dark">
      {/* SEO TITLE */}
      <h1 className="sr-only">About Me</h1>

      {/* CONTENT */}
      <div style={{ paddingTop: 100 }}>
        <SideBySide
          title={title}
          description={copyText}
          imageURL={imageSrc}
          imageAspectRatio={aspectRatio}
          variant="dark"
          showSocial={showSocial}
        />
      </div>
    </Layout>
  );
};

export default AboutPage;
