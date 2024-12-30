"use client";

import {
  IHero,
  IModelGrid,
  IProject,
  IQueue,
  ISideBySide,
} from "@/types/__generated__/contentful";
import Hero from "../Hero";
import SideBySide from "../SideBySide";
import FeaturedProject from "../FeaturedProject";
import ModelGrid from "../ModelGrid";
import { Entry } from "contentful";

type Props = {
  module: Entry<unknown>;
  index?: number;
};

const SectionRenderer: React.FC<Props> = ({ module, index }) => {
  switch (module.sys.contentType.sys.id) {
    case "hero": {
      const section = module as IHero;
      return (
        <Hero
          title={section.fields.title}
          eyebrow={section.fields.eyebrow}
          showSocial={true}
        />
      );
    }
    case "sideBySide": {
      const section = module as ISideBySide;
      return (
        <SideBySide
          title={section.fields.title}
          description={section.fields.copyText}
          imageURL={section.fields.image?.fields?.file?.url}
          variant={section.fields.variant}
          showSocial={section.fields.showSocial}
        />
      );
    }
    case "project": {
      const section = module as IProject;
      const isAlt = (index ?? 0) % 2 === 0;
      const imageURL = section.fields.featuredMedia?.fields.file.url;

      return (
        <FeaturedProject
          title={section.fields.title}
          description={section.fields.descriptionShort}
          roles={section.fields.projectRoles}
          variant={isAlt ? "dark" : "light"}
          layout={isAlt ? "left" : "right"}
          link={section.fields.url}
          image={
            imageURL
              ? {
                  url: imageURL,
                  altText:
                    section.fields.featuredMedia?.fields.title ||
                    section.fields.title,
                }
              : undefined
          }
        />
      );
    }
    case "modelGrid": {
      const section = module as IModelGrid;
      const models = (section?.fields?.items || [])?.map((item) => ({
        title: item.fields.title,
        imageURL: item.fields.image.fields.file.url,
      }));
      return <ModelGrid title={section?.fields?.title} items={models} />;
    }
    case "queue": {
      const section = module as IQueue;
      const items = (section.fields.items || []) as Entry<unknown>[];

      return (
        <>
          {items?.map((item, i) => (
            <SectionRenderer key={item.sys.id} module={item} index={i} />
          ))}
        </>
      );
    }
  }

  return <></>;
};

export default SectionRenderer;
