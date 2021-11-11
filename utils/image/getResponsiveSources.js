import optimizeSource from "./optimizeSource";

/**
 * Provided a breakpoints array (like above),
 * returns an array of source objects to populate a
 * <picture> element.
 * @param {String} src - source URL for the media
 * @param {Array of Objects} breakpoints
 * @param {Array of Objects}
 */
const getResponsiveSources = (src, breakpoints) => {
  // Bail if provided a non-array
  if (!Array.isArray(breakpoints)) {
    return [];
  }
  // Array of formats we'll output for each source element
  const formats = [
    { format: "webp", type: "image/webp" },
    { format: "pjpg", type: "image/jpeg" },
  ];

  // Get sorted array of all the numeric breakpoints
  const allBreakpoints = breakpoints
    .map((bp) => bp.breakpoint || 0) // map out the breakpoint integer
    .filter((j, i, arr) => i === arr.indexOf(j)) // Filter out non-unique values
    .sort((a, b) => a - b); // Sort ascending

  // Get lowest non zero & highest breakpoints, so we can modify the media query for each <source>
  const lowestNonZero = allBreakpoints.find((bp) => bp > 0);
  const highest = allBreakpoints[allBreakpoints.length - 1];

  // If there's *not* a lowest non-zero value (aka entire arr is breakpoints of '0'),
  // return an empty arr (it was likely passed an invalid config)
  if (!lowestNonZero) return [];

  // Reduce out an array of data that will create the various <source> elements
  return breakpoints.reduce(
    (acc, { breakpoint, src: bpSrc, width, height, crop }) => {
      // Construct the applicable media query per our breakpoints array
      const bpIndex = allBreakpoints.indexOf(breakpoint);
      const media = !breakpoint
        ? `(max-width:${lowestNonZero - 1}px)`
        : breakpoint === highest
        ? `(min-width: ${highest}px)`
        : `(min-width:${breakpoint}px) and (max-width:${
            allBreakpoints[bpIndex + 1]
          }px)`;

      // For each image format, output a source object
      const breakpointFormat = formats.map(({ format, type }) => {
        return {
          media,
          type,
          srcSet: optimizeSource({
            url: bpSrc || src, // use the breakpoint's specified src, or the default src passed to this method
            width,
            height,
            format,
            crop,
          }),
        };
      });
      return [...acc, ...breakpointFormat];
    },
    []
  );
};

export default getResponsiveSources;
