import { useEffect, useState } from "react";
import clsx from "clsx";

import useDimensions from "../hooks/useDimensions";

import styles from "./Hero.module.scss";
import SocialMediaLinks from "../SocialMediaLinks";

/**
 *
 * @param {*} distanceFromOrigin (negative value will fall off the line)
 * @param {*} origin
 * @param {*} target
 */
const getPointOnLine = ([originX, originY], [targetX, targetY], distance) => {
  const xlen = targetX - originX;
  const ylen = targetY - originY;
  const origDistance = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2));

  const ratio = distance / origDistance;
  const newX = xlen * ratio;
  const newY = ylen * ratio;

  // const newX = originX + newXlen;
  // const newY = originY + newYlen;

  return [newX, newY];
};

const getOffsetWithFalloff = (
  [originX = 0, originY = 0],
  [targetX = 0, targetY = 0],
  multiplier = 0.1,
  invert = false
) => {
  // Use pythagorean theorem to get distance between the two points
  const distance = Math.sqrt(
    Math.pow(originX - targetX, 2) + Math.pow(originY - targetY, 2)
  );

  // If we've inverted, flip the target around on the coordinate plane.
  targetX = invert ? originX - (targetX - originX) : targetY;
  targetY = invert ? originY - (targetY - originY) : targetY;

  // Return point on line.
  return getPointOnLine(
    [originX, originY],
    [targetX, targetY],
    multiplier * distance
  );
};

export default ({ title = "", eyebrow = "", showSocial = true }) => {
  const [{ x, y, width, height }, heroNode, assignHeroRef] = useDimensions();
  const [[mouseX, mouseY], setMouseCoords] = useState([0, 0]);
  const [[centerX, centerY], setCenterCoords] = useState([0, 0]);

  // Handler to capture mouse coords on mousemove
  const handleMousemove = (e) => {
    setMouseCoords([e.pageX, e.pageY]);
  };

  // LIFECYCLE
  useEffect(() => {
    // On initial mount, bind event handler
    window.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  useEffect(() => {
    // Anytime hero dimensions change, update the center coordinates
    console.log(
      "Center coords: ",
      [x + 0.5 * width, y + 0.5 * height],
      [width, height, x, y]
    );
    setCenterCoords([x + 0.5 * width, y + 0.5 * height]);
  }, [x, y, width, height]);

  const [offsetX, offsetY] = getOffsetWithFalloff(
    [centerX, centerY],
    [mouseX, mouseY],
    0.03,
    true
  );

  return (
    <div ref={assignHeroRef} className={styles.hero}>
      {/* SEO TITLE (Invisible, text that renders is an SVG)  */}
      <h2 className={clsx([styles["hero-title"], "sr-only"])}>{title}</h2>

      {/* VISIBLE + MASKED CONTENT */}
      {["normal", "masked"].map((type, i) => (
        <div
          key={i}
          className={clsx([
            styles["hero-content"],
            styles[`hero-content--${type}`],
          ])}
          style={{
            WebkitMaskPosition: `${offsetX}px ${offsetY}px`,
            maskPosition: `${offsetX}px ${offsetY}px`,
            backgroundPosition: `${offsetX}px ${offsetY}px`,
          }}
        >
          <div className={styles["hero-content__inner"]}>
            {/* EYEBROW */}
            <div className={styles["hero-eyebrow"]}>{eyebrow}</div>

            {/* TITLE */}
            <h2
              className={clsx([styles["hero-title"], "h1"])}
              style={{ maxWidth: 600 }}
            >
              {title}
            </h2>

            {/* SOCIAL */}
            {showSocial && <div></div>}
          </div>
        </div>
      ))}
    </div>
  );
};