// Next.js Components
import Head from "next/head";

// Components
import Hero from "/components/Hero/Hero";
import ProjectList from "components/ProjectList/ProjectList";

// Utils
import { getAllProjects } from "../utils/contentful";

export default function Home({ preview, allProjects }) {
  return (
    <div className="">
      {/*
      =========================
      HEAD
      =========================
      */}
      <Head>
        <title>Zachary Schaffter | UI Developer</title>
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
        <ProjectList projects={allProjects} />
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
  const allProjects = (await getAllProjects(preview)) ?? [];

  // Return
  return {
    props: { preview, allProjects },
  };
}
