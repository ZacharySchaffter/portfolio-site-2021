import { CONTENT_TYPE, IEntry } from "@/types/__generated__/contentful";
import * as contentful from "contentful";

const CONTENTFUL_SPACE = process.env.CONTENTFUL_SPACE_ID || "";
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || "";

class Contentful {
  private client: contentful.ContentfulClientApi;

  constructor(
    private readonly space: string,
    private readonly accessToken: string
  ) {
    if (!space) {
      throw new Error("contentful space id not provided and is required");
    }
    this.space = space;
    if (!accessToken) {
      throw new Error("contentful access token not provided and is required");
    }
    this.accessToken = accessToken;

    // Create contentful client with space/token
    this.client = contentful.createClient({
      space: space,
      accessToken: accessToken,
    });
  }

  async getContentByHandle<T extends IEntry>(
    handle: string,
    contentType: CONTENT_TYPE
  ): Promise<T | undefined> {
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
      return entries.items[0] as T;
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

// /**
//  * Provided a Contentful 'project' model, this
//  * simplifies its shape so it can be used more
//  * easily.
//  * @param {Object} contentful
//  * @returns {Object} formatted contentful
//  */
// const formatProjectModel = (contentful = {}) => {
//   return {
//     id: contentful?.sys?.id || null,
//     createdAt: contentful?.sys?.createdAt || null,
//     updatedAt: contentful?.sys?.updatedAt,
//     ...contentful.fields,
//   };
// };

// /**
//  * Fetch a single page from C7ontentful
//  * @returns {Object, undefined}
//  */
// export async function getPage() {
//   const entries = await client.getEntries();
//   if (entries.items) return entries.items;
//   console.log(`Error getting Entries for ${contentType.name}.`);
// }

// /**
//  * Fetch project list from Contentful
//  * @returns {Array, undefiner}
//  */
// export async function getAllProjects() {
//   const entries = await client.getEntries({
//     content_type: "project",
//   });

//   // If retrieved valid items, return transformed data.
//   if (Array.isArray(entries?.items)) {
//     return entries.items.map(formatProjectModel);
//   }

//   // Otherwise, throw error
//   throw new Error("Error fetching projects.");
// }

// /**
//  * Fetches the curated project list.
//  * Expects the list to have a `handle` field with a value of 'project-list'
//  * @returns {Array, undefined}
//  */
// export async function getProjectList() {
//   const entries = await client.getEntries({
//     content_type: "queue",
//     fields: {
//       handle: "project-list",
//       include: 5,
//     },
//   });

//   // Get list from entries
//   const list = entries.total > 0 && entries.items[0];

//   if (list && list?.fields?.items) {
//     return list.fields.items
//       .map(formatProjectModel) // format the objects
//       .filter((itm) => !!itm.createdAt && !!itm.updatedAt); // remove any that don't have fields (likely means it's currently in draft mode)
//   }

//   // Otherwise, throw error
//   throw new Error("Error fetching project list.");
// }
