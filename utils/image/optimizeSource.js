const sanitizeUrl = ({ url }) => {
  const src = url.split("&")[0];
  return src.split("//")[0] !== "https:"
    ? `https://${src.split("//")[1]}`
    : src;
};

const roundedUpToNearest50px = (x) => {
  if (x >= 50) {
    return +x + 49 - ((+x + 49) % 50);
  }
};

const contentfulSplitUrl = ({ src = null }) => {
  const [baseWithExt, args] = src.split("?");
  const [extension] = Array.from(baseWithExt.split(".")).reverse();
  const [base] = baseWithExt.split(`.${extension}`);
  return [base, args, extension];
};

const contentfulResize = ({
  src = null,
  width = null,
  height = null,
  crop = false,
} = {}) => {
  function getSizeString() {
    if (width && height) {
      return `w=${width}&h=${height}`;
    } else if (width && !height) {
      return `w=${width}`;
    } else if (!width && height) {
      return `h=${height}`;
    } else {
      return new Error("No image size specified");
    }
  }
  if (typeof src === "string") {
    const [base, args, extension] = contentfulSplitUrl({ src });
    const sizeString = getSizeString();
    const cropString = crop ? `&fit=crop&f=${crop}` : "";
    const newArgs = args
      ? args
          .split("&")
          .filter((el) => el.includes("width=") === false)
          .join("&")
          .concat(`&${sizeString}`)
      : sizeString + cropString;
    const newSrc = newArgs
      ? base.concat(`.${extension}?${newArgs}`)
      : base.concat(`.${extension}`);
    return newSrc;
  }
  return null;
};

/**
 * Takes an image stored in Contentful and returns a query string
 * or image in the requested format.
 *
 * @param {Object} options - Configuration options
 * @param {string} options.src - The image `src`
 * @param {string} options.format - The desired output format ('webp' , 'pjpg' , etc.)
 */
const contentfulReformat = ({ src = null, format = "webp" } = {}) => {
  if (typeof src === "string") {
    const [base, args, extension] = contentfulSplitUrl({ src });
    const imgFormat =
      format === "auto" ? "jpg" : format === "jpeg" ? "jpg" : format; // default is 'jpg'
    if (imgFormat !== extension) {
      const newArgs = args
        ? args
            .split("&")
            .filter((el) => el.includes("fl=") === false)
            .filter((el) => el.includes("fm=") === false)
            .join("&")
        : "";
      if (imgFormat === "png" || imgFormat === "jpg" || imgFormat === "webp") {
        return `${base}.${extension}?${newArgs}&fm=${imgFormat}`;
      } else if (imgFormat === "pjpg") {
        return `${base}.${extension}?${newArgs}&fm=jpg&fl=progressive`;
      }
    } else {
      // return the original image if not being converted to a possible extension
      return src;
    }
  } else {
    return null;
  }
};

export default ({
  url = null,
  format = "auto",
  width = null,
  height = null,
  crop = false,
} = {}) => {
  if (typeof url !== "string") {
    throw new TypeError(
      `Image src must be a string; Received type: ${typeof url}\nReceived: ${JSON.stringify(
        url
      )}`
    );
  }

  const reformattedSrc = contentfulReformat({
    src: sanitizeUrl({ url }),
    format,
  });

  if (!width && !height) {
    return reformattedSrc;
  } else {
    return contentfulResize({
      src: reformattedSrc,
      width: roundedUpToNearest50px(width),
      height: roundedUpToNearest50px(height),
      crop,
    });
  }
};
