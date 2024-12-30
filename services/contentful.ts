import {
  CONTENT_TYPE,
  IHero,
  IModel3D,
  IModelGrid,
  INavigationItem,
  INavigationMenu,
  IPage,
  IProject,
  IQueue,
  ISideBySide,
  ITextBlock,
} from "@/types/__generated__/contentful";
import * as contentful from "contentful";

const CONTENTFUL_SPACE = process.env.CONTENTFUL_SPACE_ID || "";
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || "";

type ContentTypeMap = {
  hero: IHero;
  model3d: IModel3D;
  modelGrid: IModelGrid;
  navigationItem: INavigationItem;
  navigationMenu: INavigationMenu;
  page: IPage;
  project: IProject;
  queue: IQueue;
  sideBySide: ISideBySide;
  textBlock: ITextBlock;
};

class Contentful {
  private client: contentful.ContentfulClientApi;

  constructor(space: string, accessToken: string) {
    if (!space) {
      throw new Error("contentful space id not provided and is required");
    }

    if (!accessToken) {
      throw new Error("contentful access token not provided and is required");
    }

    // Create contentful client with space/token
    this.client = contentful.createClient({
      space,
      accessToken,
    });
  }

  async getContentByHandle<C extends CONTENT_TYPE>(
    contentType: C,
    handle: string
  ): Promise<ContentTypeMap[C] | undefined> {
    const entries = await this.client.getEntries({
      content_type: contentType,
      "fields.handle": handle,
    });

    if (entries && entries.total && entries.items[0]) {
      return entries.items[0] as ContentTypeMap[C];
    }

    throw new Error(`Error fetching model with handle: ${handle}`);
  }

  async getAllContent<C extends CONTENT_TYPE>(
    contentType: C
  ): Promise<ContentTypeMap[C][] | undefined> {
    const entries = await this.client.getEntries({
      content_type: contentType,
    });

    if (entries) {
      return entries.items as ContentTypeMap[C][];
    }

    throw new Error(`error fetching content with type "${contentType}"`);
  }

  async getPageBySlug(slug: string): Promise<IPage> {
    const entries = await this.client.getEntries({
      content_type: "page",
      "fields.slug": slug,
      include: 5,
    });

    if (entries && entries.total > 0 && entries.items[0]) {
      return entries.items[0] as IPage;
    }

    throw new Error(`failed to retrieve page with slug "${slug}"`);
  }
}

export default new Contentful(CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN);
