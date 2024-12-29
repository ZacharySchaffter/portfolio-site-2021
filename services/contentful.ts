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
    if (!handle) {
      throw new Error("no handle provided and is required.");
    }
    if (!contentType) {
      throw new Error("no contentType provided and is required.");
    }
    const entries = await this.client.getEntries({
      content_type: contentType,
      "fields.handle": handle,
    });

    if (entries && entries.total && entries.items[0]) {
      return entries.items[0] as ContentTypeMap[C];
    }

    throw new Error(`Error fetching model with handle: ${handle}`);
  }

  /**
   * Fetch a single page from C7ontentful
   * @returns {Object, undefined}
   */
  async getPage() {
    const entries = await this.client.getEntries();
    if (entries.items) return entries.items;
    console.log(`Error getting entries for.`);
  }
}

export default new Contentful(CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN);
