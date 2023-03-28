import { getModelByHandle } from "utils/contentful";
import SideBySide from "components/SideBySide/SideBySide";

const About = ({ sbs }) => {
  const { title, copyText, image, showSocial } = sbs?.fields || {};
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

export async function getStaticProps() {
  const sbs = (await getModelByHandle("sbs-about-me", "sideBySide")) ?? {};

  return {
    props: { background: "black", sbs },
  };
}

export default About;
