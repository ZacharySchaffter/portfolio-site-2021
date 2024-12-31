import { ReactNode } from "react";
import { Metadata } from "next";
import contentful from "@/services/contentful";
import Layout from "@/components/Layout";
import SectionRenderer from "@/components/SectionRenderer";
import { IPage } from "@/types/__generated__/contentful";
import { notFound } from "next/navigation";
import trim from "lodash/trim";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const pages = await contentful.getAllContent("page");
  return (
    pages?.map((entry) => ({
      slug: trim(entry.fields.slug, "/").split("/"),
    })) || []
  );
}

async function getPageData(slug: string[]): Promise<IPage> {
  try {
    const page = await contentful.getPageBySlug(
      slug ? "/" + slug.join("/") : "/"
    );
    return page;
  } catch (err) {
    throw new Error(`error fetching page with slug: ${slug.join("/")}`, {
      cause: err,
    });
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  try {
    const page = await getPageData((await params).slug);
    if (page.fields.metaTitle || page.fields.metaDescription) {
      const meta: Metadata = {};
      if (page.fields.metaTitle) meta.title = page.fields.metaTitle;
      if (page.fields.metaDescription) meta.title = page.fields.metaDescription;
      return meta;
    }
  } catch (err) {
    // do nothing - default in layout will set the meta
  }
}

const DynamicPage = async ({ params }: Props): Promise<ReactNode> => {
  let page: IPage;
  try {
    page = await getPageData((await params).slug);
  } catch (err) {
    console.error("error fetching page data:");
    console.error(err);
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
