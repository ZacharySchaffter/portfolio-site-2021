import { ComponentProps, ReactNode } from "react";
import { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import contentful from "@/services/contentful";
import { IProject, IQueue } from "@/types/__generated__/contentful";

export const metadata: Metadata = {
  title: "Zachary Schaffter | Frontend Software Engineer",
};

const IndexPage = async (): Promise<ReactNode> => {
  let projectQueue: IQueue | undefined;

  try {
    projectQueue = await contentful.getContentByHandle<IQueue>(
      "project-list",
      "queue"
    );
  } catch (err) {
    console.error("project list not found", err);
  }

  const projects =
    projectQueue?.fields.items?.filter(
      (item): item is IProject => item.sys.contentType?.sys?.id === "project"
    ) || [];

  return (
    <>
      {/* SEO TITLE */}
      <h1 className="sr-only">
        Zachary Schaffter | Frontend Software Engineer
      </h1>

      {/* HERO */}
      <section data-invert-header="false">
        <Hero title="Frontend Engineer" eyebrow="Zachary Schaffter" />
      </section>

      {/* PROJECTS */}
      <div className="project-list">
        {projects?.map((p, i) => {
          let image: ComponentProps<typeof FeaturedProject>["image"];
          const imageURL = p.fields.featuredMedia?.fields?.file?.url;
          const imageAlt =
            p.fields.featuredMedia?.fields?.title || p.fields.title;
          if (imageURL && imageAlt) {
            image = {
              url: imageURL,
              altText: imageAlt,
            };
          }
          return (
            <section key={i} data-invert-header={i % 2 === 0}>
              <FeaturedProject
                title={p.fields.title!}
                description={p.fields.descriptionShort}
                roles={p.fields.projectRoles}
                link={p.fields.url}
                image={image}
                layout={i % 2 ? "right" : "left"}
                variant={i % 2 ? "light" : "dark"}
              />
            </section>
          );
        })}
      </div>
    </>
  );
};

export default IndexPage;
