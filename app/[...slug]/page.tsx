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

export async function generateStaticParams() {
  const pages = await contentful.getAllContent("page");
  return (
    pages?.map((entry) => ({
      slug: entry.fields.slug?.split("/"),
    })) || []
  );
}

const DynamicPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ReactNode> => {
  const asyncSlug =
    "/" + ((await params).slug as unknown as string[])?.join("/");

  let page: IPage;
  try {
    page = await contentful.getPageBySlug(asyncSlug);
  } catch (err) {
    console.error(`error fetching page: ${asyncSlug}`);
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

export default DynamicPage;
