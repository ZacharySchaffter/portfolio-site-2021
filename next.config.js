const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    // Import the following into all stylesheets automatically
    additionalData: `
      @import "utils";
      @import "variables";
    `,
  },
};
