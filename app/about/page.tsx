import { ReactNode } from "react";
import { getModelByHandle } from "@/utils/contentful";
import SideBySide from "@/components/SideBySide/SideBySide";

const AboutPage = async (): Promise<ReactNode> => {
  let module;
  try {
    module = await getModelByHandle("sbs-about-me", "sideBySide");
  } catch (err) {
    console.log("error fetching about me module:", err);
    throw new Error("failed to retrieve about me module");
  }

  const { title, copyText, image, showSocial } = module?.fields || {};
  const imageSrc = image?.fields?.file?.url;
  const { width, height } = image?.fields?.file?.details?.image || {
    width: 0,
    height: 0,
  };
  const aspectRatio = width / height;

  return (
    <div>
      <>
        {/* SEO TITLE */}
        <h1 className="sr-only">About Me</h1>

        {/* CONTENT */}
        <SideBySide
          title={title}
          description={copyText}
          imageUrl={imageSrc}
          imageAspectRatio={aspectRatio}
          style={"dark"}
          showSocial={showSocial}
        />
      </>
    </div>
  );
};

export default AboutPage;
