import clsx from "clsx";
import dynamic from "next/dynamic";

import styles from "./Hero.module.scss";
import SocialMediaLinks from "../SocialMediaLinks";

// Dynamic import to ensure this only renders on client (we need browser data for positioning)
const DynamicHeroSvg = dynamic(() => import("./HeroSvg"), { ssr: false });

export default ({ title = "", eyebrow = "", showSocial = true }) => {
  return (
    <div className={styles.hero}>
      {/* SEO TITLE (Invisible, text that renders is an SVG)  */}
      <h2 className={clsx([styles["hero-title"], "sr-only"])}>{title}</h2>

      {/* SVG (Actual rendered markup of the hero) */}
      <DynamicHeroSvg title={title} />

      {/* TODO: Add social to SVG */}
      {/* {showSocial && (
        <div className={styles["hero-social"]}>
          <SocialMediaLinks />
        </div>
      )} */}
    </div>
  );
};
