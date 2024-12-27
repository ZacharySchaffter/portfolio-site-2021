import { ReactNode } from "react";
import contentful from "@/services/contentful";
import { IModel3D, IQueue } from "@/types/__generated__/contentful";
import Layout from "@/components/Layout";
import ModelGrid from "@/components/ModelGrid";

const Models3DPage = async (): Promise<ReactNode> => {
  let minisQueue: IQueue | undefined;
  try {
    minisQueue = await contentful.getContentByHandle(
      "queue",
      "miniatures-queue"
    );
  } catch (err) {
    console.log("error fetching models-grid module:", err);
    throw new Error("failed to retrieve models grid module");
  }

  const items = (minisQueue?.fields?.items || []) as IModel3D[];

  const models = items.map((item) => ({
    title: item.fields.title,
    imageURL: item.fields.image.fields.file.url,
    fileURL: undefined,
  }));

  return (
    <Layout bgColor="light">
      <h1 className="sr-only">3D Models</h1>

      <div style={{ marginTop: 100 }}>
        <ModelGrid title="3D Models" items={models} />
      </div>
    </Layout>
  );
};

export default Models3DPage;
