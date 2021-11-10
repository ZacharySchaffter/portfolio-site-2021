const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

/**
 * Provided a Contentful 'project' model, this
 * simplifies its shape so it can be used more
 * easily.
 * @param {Object} contentful
 * @returns {Object} formatted contentful
 */
const formatProjectModel = (contentful = {}) => {
  return {
    id: contentful?.sys?.id || null,
    createdAt: contentful?.sys?.createdAt || null,
    updatedAt: contentful?.sys?.updatedAt,
    ...contentful.fields,
  };
};

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
    return entries.items.map(formatProjectModel);
  }

  // Otherwise, throw error
  throw new Error("Error fetching projects.");
}

/**
 * Fetches the curated project list.
 * Expects the list to have a `handle` field with a value of 'project-list'
 * @returns {Array, undefined}
 */
export async function getProjectList() {
  const entries = await client.getEntries({
    content_type: "queue",
    fields: {
      handle: "project-list",
      include: 5,
    },
  });

  // Get list from entries
  const list = entries.total > 0 && entries.items[0];

  if (list && list?.fields?.items) {
    return list.fields.items
      .map(formatProjectModel) // format the objects
      .filter((itm) => !!itm.createdAt && !!itm.updatedAt); // remove any that don't have fields (likely means it's currently in draft mode)
  }

  // Otherwise, throw error
  throw new Error("Error fetching project list.");
}

export default { getPage, getAllProjects };
