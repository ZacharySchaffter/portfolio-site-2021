// Components
import Hero from "/components/Hero/Hero";
import FeaturedProject from "components/FeaturedProject/FeaturedProject";

// Utils
import { getProjectList } from "../utils/contentful";

export default function Home({ preview, projects }) {
  return (
    <>
      {/* SEO TITLE */}
      <h1 className="sr-only">Zachary Schaffter | UI Developer</h1>

      {/* HERO */}
      <section data-invert-header="false">
        <Hero title="Front-End Developer" eyebrow="Zachary Schaffter" />
      </section>
      {/* PROJECTS */}
      <div className="project-list">
        {projects.map((p, i) => (
          <section data-invert-header={i % 2 === 0}>
            <FeaturedProject
              key={i}
              project={p}
              layout={i % 2 ? "right" : "left"}
              style={i % 2 ? "light" : "dark"}
            />
          </section>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  // Fetch all projects
  const projects = (await getProjectList(preview)) ?? [];

  return {
    props: { preview, projects },
  };
}
