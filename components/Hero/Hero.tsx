"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Hero.module.scss";
import useDimensions from "@/hooks/useDimensions";
import SocialMediaLinks from "@/components/SocialMediaLinks";

type CoordsTuple = [number, number];
const getPointOnLine = (
  [originX, originY]: CoordsTuple,
  [targetX, targetY]: CoordsTuple,
  distance: number
): CoordsTuple => {
  const xlen = targetX - originX;
  const ylen = targetY - originY;
  const origDistance = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2));

  const ratio = distance / origDistance;
  const newX = xlen * ratio;
  const newY = ylen * ratio;

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

type Props = {
  title: string;
  eyebrow?: string;
  showSocial?: boolean;
};
const Hero: React.FC<Props> = ({
  title = "",
  eyebrow = "",
  showSocial = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { left, top, width, height } = useDimensions(ref.current);
  const [[mouseX, mouseY], setMouseCoords] = useState([0, 0]);
  const [[centerX, centerY], setCenterCoords] = useState([0, 0]);

  useEffect(() => {
    const handleMousemove = (e: MouseEvent) => {
      setMouseCoords([e.pageX, e.pageY]);
    };
    const node = ref.current;
    if (!node) return;
    node.addEventListener("mousemove", handleMousemove);

    return () => {
      node?.removeEventListener("mousemove", handleMousemove);
    };
  });

  // Anytime hero dimensions change, update the center coordinates
  useEffect(() => {
    setCenterCoords([left + 0.5 * width, top + 0.5 * height]);
  }, [left, top, width, height]);

  const [offsetX, offsetY] = getOffsetWithFalloff(
    [centerX, centerY],
    [mouseX, mouseY],
    0.03,
    true
  );

  return (
    <div
      ref={ref}
      className={clsx(styles.hero, "bg-static")}
      style={{
        // @ts-expect-error TODO: add css vars to typing
        "--bg-offset-x": offsetX + "px",
        "--bg-offset-y": Math.min(offsetY, 70) + "px",
      }}
      data-invert-header="false"
    >
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
          aria-hidden={type === "masked"}
        >
          <div className={styles["hero-content__inner"]}>
            {/* EYEBROW */}
            <div className={styles["hero-eyebrow"]}>{eyebrow}</div>

            {/* TITLE */}
            <h2
              className={clsx([styles["hero-title"], "h1"])}
              data-text={title}
            >
              {title}
            </h2>

            {/* SOCIAL */}
            <SocialMediaLinks
              className={styles["hero-social"]}
              color={type === "masked" ? "#FFF" : "#000"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
