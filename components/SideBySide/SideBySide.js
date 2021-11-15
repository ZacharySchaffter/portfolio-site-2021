import clsx from "clsx";
import { parse } from "marked";
import SocialMediaLinks from "components/SocialMediaLinks";
import styles from "./SideBySide.module.scss";
import SmartImage from "components/SmartImage";

const SidebySide = ({
  title = "",
  description = "",
  imageUrl = null,
  showSocial = false,
  style = "light", // 'light', 'dark'
}) => {
  return (
    <div className={clsx(styles["sbs"], styles[`sbs--style-${style}`])}>
      <div className={clsx(styles["sbs__inner"])}>
        {/* COLUMN (CONTENT) */}
        <div className={clsx(styles["sbs-col"], styles["sbs-col--content"])}>
          {/* TITLE */}
          <h1
            className={styles["sbs__title"]}
            style={{ fontSize: `${45 / title.length}vw` }}
            data-text={title}
          >
            {title}
          </h1>

          {/* DESCRIPTION */}
          <div
            className={styles["sbs__description"]}
            dangerouslySetInnerHTML={{ __html: parse(description) }}
          />

          {/* SOCIAL MEDIA */}
          {showSocial && (
            <div className={styles["sbs__social"]}>
              <p>Check me out on:</p>
              <SocialMediaLinks color="#FFF" />
            </div>
          )}
        </div>

        {/* COLUMN (IMAGE) */}
        <div className={clsx(styles["sbs-col"], styles["sbs-col--image"])}>
          <SmartImage src={imageUrl} layout="static" />
        </div>
      </div>
    </div>
  );
};

export default SidebySide;
