import { ReactNode } from "react";
import { Metadata } from "next";
import contentful from "@/services/contentful";
import Layout from "@/components/Layout";
import SectionRenderer from "@/components/SectionRenderer";
import { IPage } from "@/types/__generated__/contentful";
import { notFound } from "next/navigation";
import trim from "lodash/trim";

export const metadata: Metadata = {
  title: "Zachary Schaffter | Frontend Software Engineer",
};

export async function generateStaticParams() {
  const pages = await contentful.getAllContent("page");
  return (
    pages?.map((entry) => ({
      slug: trim(entry.fields.slug, "/").split("/"),
    })) || []
  );
}

const DynamicPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ReactNode> => {
  const asyncSlug = (await params).slug as unknown as string[];
  let page: IPage;
  try {
    page = await contentful.getPageBySlug(
      asyncSlug ? "/" + asyncSlug.join("/") : "/"
    );
  } catch (err) {
    console.error(`error fetching page: ${asyncSlug}`);
    return notFound();
  }

  const pages = await contentful.getAllContent("page");
  console.log(pages?.map((p) => trim(p.fields.slug, "/").split("/")));

  return (
    <Layout bgColor={page.fields.backgroundColor}>
      {page.fields.sections?.map((section) => (
        <SectionRenderer key={section.sys.id} module={section} />
      ))}
    </Layout>
  );
};

export default DynamicPage;
