import { useState, useEffect, useCallback } from "react";
import useDimensions from "../hooks/useDimensions";
import clsx from "clsx";
import styles from "./HeroSvg.module.scss";

// The base transform that the node uses
const baseTransform = {
  translate: {
    x: -500,
    y: -20,
  },
  rotate: {
    d: 30,
    x: 700,
    y: 200,
  },
  scale: 2,
};

/**
 * Provided x/y coordinates, this method returns
 * a new `transform` attribute for the svg zigzag node.
 * @param {Integer} x - translation in x axis
 * @param {Integer} y - translation in y axis
 * @returns {String}
 */
const getTransform = (x = 0, y = 0) => {
  // Base transforms
  const { translate, rotate, scale } = baseTransform;

  // New transforms
  const newRotate = `rotate(${`${rotate.d},${rotate.x}, ${rotate.y}`})`;
  const newTranslate = `translate(${translate.x + x}, ${translate.y + y})`;
  const newScale = `scale(${scale})`;

  return `${newRotate} ${newTranslate} ${newScale}`;
};

/**
 * ZigZag - Renders the zig-zag image that functions are both a visible asset + svg mask
 */
const ZigZag = ({ invert, ...props }) => {
  const light = invert ? styles["zig-zag--dark"] : styles["zig-zag--light"];
  const dark = invert ? styles["zig-zag--light"] : styles["zig-zag--dark"];
  return (
    <>
      {/* ZIG ZAG SHAPE */}
      <g className={clsx({ invert: !!invert })} {...props}>
        <path
          className={light}
          d="M1465.63,65.55l134.43,355.94h-66.83L1426,136.08l39.59-70.53m.17-2.36L1424.94,136l107.6,286.49h69L1465.8,63.19Z"
          transform="translate(-28.08 -41.65)"
        />
        <path
          className={light}
          d="M1134.44,64.42,1000,420.37l-39.58-70.54L1067.61,64.42h66.83m1.45-1h-69l-107.6,286.5,40.86,72.81L1135.89,63.42Z"
          transform="translate(-28.08 -41.65)"
        />
        <path
          className={light}
          d="M534.38,65.55,668.82,421.49H602L494.8,136.08l39.58-70.53m.18-2.36L493.7,136,601.29,422.49h69L534.56,63.19Z"
          transform="translate(-28.08 -41.65)"
        />
        <path
          className={light}
          d="M203.2,64.42l-134.44,356L29.18,349.83,136.37,64.42H203.2m1.45-1h-69L28.08,349.92l40.86,72.81L204.65,63.42Z"
          transform="translate(-28.08 -41.65)"
        />
        <polygon
          className={dark}
          points="1351.3 21.54 1233.69 244.67 1128.72 21.54 1037.74 21.54 1226.04 402.62 1438.08 21.54 1351.3 21.54"
        />
        <polygon
          className={dark}
          points="885.68 381.08 768.07 157.94 663.1 381.08 572.12 381.08 760.41 0 972.46 381.08 885.68 381.08"
        />
        <polygon
          className={dark}
          points="420.06 21.54 302.44 244.67 197.48 21.54 106.5 21.54 294.79 402.62 506.83 21.54 420.06 21.54"
        />
      </g>
    </>
  );
};

const SvgText = ({
  text = "",
  x = null,
  y = null,
  breakOn = false,
  ...props
}) => {
  let textArr = [text];
  switch (breakOn) {
    case "space":
      textArr = text.split(" ");
  }
  textArr = textArr.filter((str) => !!str);
  return (
    <text {...props}>
      {textArr.map((str, i) => (
        <tspan key={i} x={x} y={y} dy="1.2em">
          {str}
        </tspan>
      ))}
    </text>
  );
};

const HeroText = ({ width = "", height = "", title = "", eyebrow = "" }) => {
  const [
    { x: titleX, y: titleY, height: titleHeight, width: titleWidth },
    titleNode,
    titleRef,
  ] = useDimensions();
  const [
    { x: eyebrowX, y: eyebrowY, height: eyebrowHeight, width: eyebrowWidth },
    eyebrowNode,
    eyebrowRef,
  ] = useDimensions();
  const [parentDimensions, setParentDimensions] = useState(null);
  const [[offsetX, offsetY], setOffset] = useState([0, 0]);

  useEffect(() => {
    if (titleNode) {
      const svg = titleNode.closest("svg");
      if (svg) {
        setParentDimensions(svg.getBoundingClientRect().toJSON());
      }
    }
  });

  const centerX = parentDimensions?.x
    ? parentDimensions.x + 0.5 * parentDimensions.width
    : 0;
  const centerY = parentDimensions?.y
    ? parentDimensions.y + 0.5 * parentDimensions.height
    : 0;

  debugger;

  return (
    <g>
      {/* EYEBROW */}
      <g ref={eyebrowRef}>
        <SvgText
          text={"Zachary Schaffter"}
          className={clsx([styles["eyebrow"], "h1"])}
        />
      </g>

      {/* TITLE (Visible) */}
      <g ref={titleRef}>
        <SvgText
          text={"Front-end Developer"}
          x={centerX}
          breakOn="space"
          className={clsx([styles["title"], styles["title--main"], "h1"])}
        />

        {/* TITLE (Masked) */}
        <SvgText
          text={"Front-end Developer"}
          breakOn="space"
          x={centerX}
          className={clsx([styles["title"], styles["title--masked"], "h1"])}
          mask={"url(#zigZagMask)"}
        />
      </g>
    </g>
  );
};

const getCenter = ({ x, y, width, height }) => {
  if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
    return [0, 0];
  }
  return [x + 0.5 * width, y + 0.5 * height];
};

export default ({ title }) => {
  // STATE
  const [[centerX, centerY], setCenterCoords] = useState([0, 0]); // coordinate center of svg node (used to calc translation offset)
  const [{ width, height, x, y }, node, setSvgNode] = useDimensions();
  const [[mouseX, mouseY], setMouseCoords] = useState([centerX, centerY]); // coordinates of the mouse cursor at any given point

  // setCenterCoords(getCenter(node));

  const handleMousemove = (e) => {
    // Get mouse coordinates
    const mouseX = e.offsetX || centerX;
    const mouseY = e.offsetY || centerY;
    setMouseCoords([mouseX, mouseY]);
  };

  // LIFECYCLE
  useEffect(() => {
    // On initial mount, bind event handlers
    window.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  useEffect(() => {
    // On change of dimensions, recalc node center coordinates
    setCenterCoords(getCenter({ width, height, x, y }));
  }, [width, height, x, y]);

  // Calculate the x/y offset for the translation of the zig zag shape
  const offsetX = -0.1 * (mouseX - centerX);
  const offsetY = -0.1 * (mouseY - centerY);
  const svgTransform = getTransform(offsetX, offsetY);

  // RENDER
  return (
    <>
      {/* SVG */}
      <svg
        id="svg"
        ref={setSvgNode}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        dataheight={width}
        datawidth={height}
        viewBox={`0 0 ${width || 1600} ${height || 400}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={styles.svg}
      >
        <defs>
          {/* MASK */}
          <mask
            id="zigZagMask"
            maskUnits="userSpaceOnUse"
            width="100%"
            height="100%"
          >
            <ZigZag invert={true} transform={svgTransform} />
          </mask>
        </defs>

        {/* ZIG ZAG */}
        <ZigZag transform={svgTransform} />

        {/* TEXT CONTENT */}
        <HeroText title="Front-End Developer" eyebrow="Zachary Schaffter" />
      </svg>
    </>
  );
};
