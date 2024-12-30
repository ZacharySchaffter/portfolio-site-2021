import { ReactNode } from "react";
import { Metadata } from "next";
import contentful from "@/services/contentful";
import Layout from "@/components/Layout";
import SectionRenderer from "@/components/SectionRenderer";
import { IPage } from "@/types/__generated__/contentful";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Zachary Schaffter | Frontend Software Engineer",
};

const HomePage = async (): Promise<ReactNode> => {
  let page: IPage;
  try {
    page = await contentful.getPageBySlug("/");
  } catch (err) {
    console.error(`error fetching homepage`);
    return notFound();
  }

  return (
    <Layout bgColor={page.fields.backgroundColor}>
      {page.fields.sections?.map((section) => (
        <SectionRenderer key={section.sys.id} module={section} />
      ))}
    </Layout>
  );
};

export default HomePage;
