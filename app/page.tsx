import { ReactNode } from "react";
import { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import FeaturedProject from "@/components/FeaturedProject/FeaturedProject";
import contentful from "@/services/contentful";

export const metadata: Metadata = {
  title: "Zachary Schaffter | Frontend Software Engineer",
};

const IndexPage = async (): Promise<ReactNode> => {
  let projects;

  try {
    project = contentful.getContentByHandle("project-list", "queue")
  }

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
          <section key={i} data-invert-header={i % 2 === 0}>
            <FeaturedProject
              project={p}
              layout={i % 2 ? "right" : "left"}
              style={i % 2 ? "light" : "dark"}
            />
          </section>
        ))}
      </div>
    </>
  );
};

export default IndexPage;
