const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    // Import the following into all stylesheets automatically
    // `@use ______ as *` un-namespaces the scss module
    additionalData: `
      @use 'variables' as *;
      @use 'utils' as *;
    `,
  },
};
