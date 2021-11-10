// Next.js Components
import Head from "next/head";

// Components
import Hero from "/components/Hero/Hero";
import FeaturedProject from "components/FeaturedProject/FeaturedProject";

// Utils
import { getProjectList } from "../utils/contentful";

export default function Home({ preview, projects }) {
  return (
    <div className="">
      {/*
      =========================
      HEAD
      =========================
      */}
      <Head>
        <title>Zachary Schaffter | Front-End Developer</title>
        {/* TODO: Replace with contentful */}
        <meta
          name="description"
          content="Creative Front-End Developer based in Seattle, WA"
        />

        {/* TODO: Update */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*
      =========================
      BODY
      =========================
      */}
      <main className="">
        {/* SEO TITLE */}
        <h1 className="sr-only">Zachary Schaffter | UI Developer</h1>

        {/* HERO */}
        <Hero title="Front-End Developer" eyebrow="Zachary Schaffter" />

        {/* PROJECTS */}
        <div className="project-list">
          {projects.map((p, i) => (
            <FeaturedProject
              key={i}
              project={p}
              layout={i % 2 ? "right" : "left"}
              style={i % 2 ? "light" : "dark"}
            />
          ))}
        </div>
      </main>

      {/*
      =========================
      FOOTER
      =========================
      */}
      <footer className="">{/* TODO: Add footer */}</footer>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  // Fetch all projects
  const projects = (await getProjectList(preview)) ?? [];
  console.log(projects);
  // Return
  return {
    props: { preview, projects },
  };
}
