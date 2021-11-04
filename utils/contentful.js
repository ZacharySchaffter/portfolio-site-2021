const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

// Create contentful client with space/token
const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

/**
 * Fetch a single page from C7ontentful
 * @returns {Object, undefined}
 */
export async function getPage() {
  const entries = await client.getEntries();
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}.`);
}

/**
 * Fetch project list from Contentful
 * @returns {Array, undefiner}
 */
export async function getAllProjects() {
  const entries = await client.getEntries({
    content_type: "project",
  });

  // If retrieved valid items, return transformed data.
  if (Array.isArray(entries?.items)) {
    return entries.items.map((itm) => ({
      id: itm?.sys?.id || null,
      createdAt: itm?.sys?.createdAt || null,
      updatedAt: itm?.sys?.updatedAt,
      ...itm.fields,
    }));
  }

  // Otherwise, throw error
  throw new Error("Error fetching project list.");
}

export default { getPage, getAllProjects };
