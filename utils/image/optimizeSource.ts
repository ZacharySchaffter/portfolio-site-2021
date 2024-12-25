import { ImageFormat } from "@/types/image";

const sanitizeUrl = (url: string) => {
  const src = url.split("&")[0];
  return src.split("//")[0] !== "https:"
    ? `https://${src.split("//")[1]}`
    : src;
};

const roundedUpToNearest50px = (x: number) => {
  if (x >= 50) {
    return +x + 49 - ((+x + 49) % 50);
  }
};

const contentfulSplitUrl = (src: string): [string, string, string] => {
  const [baseWithExt, args] = src.split("?");
  const [extension] = Array.from(baseWithExt.split(".")).reverse();
  const [base] = baseWithExt.split(`.${extension}`);
  return [base, args, extension];
};

const contentfulResize = ({
  src,
  width,
  height,
  crop = false,
}: {
  src: string;
  width?: number;
  height?: number;
  crop?: boolean;
}) => {
  function getSizeString() {
    if (width && height) {
      return `w=${width}&h=${height}`;
    } else if (width && !height) {
      return `w=${width}`;
    } else if (!width && height) {
      return `h=${height}`;
    } else {
      return "";
    }
  }
  const [base, args, extension] = contentfulSplitUrl(src);
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
};

/**
 * Takes an image stored in Contentful and returns a query string
 * or image in the requested format.
 */
const contentfulReformat = ({
  src,
  format = "webp",
}: {
  src: string;
  format: ImageFormat | "auto";
}): string => {
  const [base, args, extension] = contentfulSplitUrl(src);
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
  }

  // return the original image if not being converted to a possible extension
  return src;
};

export default ({
  url,
  format = "auto",
  width,
  height,
  crop = false,
}: {
  url: string;
  format: ImageFormat | "auto";
  width?: number;
  height?: number;
  crop?: boolean;
}) => {
  const reformattedSrc = contentfulReformat({
    src: sanitizeUrl(url),
    format,
  });

  if (!width && !height) {
    return reformattedSrc;
  } else {
    return contentfulResize({
      src: reformattedSrc,
      width: width ? roundedUpToNearest50px(width) : 0,
      height: height ? roundedUpToNearest50px(height) : 0,
      crop,
    });
  }
};
