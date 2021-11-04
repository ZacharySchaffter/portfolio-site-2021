import clsx from "clsx";
import SocialMediaLinks from "../SocialMediaLinks";
import styles from "./Hero.module.scss";

export default ({ title = "", eyebrow = "", showSocial = true }) => {
  return (
    <div className={styles.hero}>
      {/* HEADER */}
      <div className={styles["hero-header"]}>
        {/* EYEBROW  */}
        <div className={styles["hero-eyebrow"]}>{eyebrow}</div>

        {/* TITLE  */}
        <h2 className={clsx([styles["hero-title"], "h1"])}>{title}</h2>
      </div>

      {/* SOCIAL MEDIA LINKS */}
      {showSocial && (
        <div className={styles["hero-social"]}>
          <SocialMediaLinks />
        </div>
      )}
    </div>
  );
};
