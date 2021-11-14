import { getModelByHandle } from "utils/contentful";
import SideBySide from "components/SideBySide/SideBySide";

const About = ({ sbs }) => {
  const { title, copyText, image, showSocial } = sbs?.fields || {};
  const imageSrc = image?.fields?.file?.url;
  // const imageAlt = image?.fields?.description;

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
          style={"dark"}
          showSocial={showSocial}
        />
      </>
    </div>
  );
};

export async function getStaticProps() {
  const sbs = (await getModelByHandle("sbs-about-me")) ?? {};

  return {
    props: { background: "black", sbs },
  };
}

export default About;
