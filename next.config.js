const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `
      @import "utils";
      @import "colors";
    `,
  },
};
