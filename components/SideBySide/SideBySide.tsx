import clsx from "clsx";
import { marked } from "marked";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import styles from "./SideBySide.module.scss";
import SmartImage from "@/components/SmartImage";

type Props = {
  title?: string;
  description?: string;
  imageURL?: string | null;
  imageAspectRatio?: number;
  showSocial?: boolean;
  variant?: "light" | "dark";
};

const SidebySide: React.FC<Props> = ({
  title = "",
  description = "",
  imageURL = null,
  imageAspectRatio = 1, // defaults to square
  showSocial = false,
  variant = "light", // 'light', 'dark'
}) => {
  return (
    <div className={clsx(styles["sbs"], styles[`sbs--style-${variant}`])}>
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
            dangerouslySetInnerHTML={{
              __html: marked.parse(description),
            }}
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

        <div
          className={clsx(styles["sbs-col"], styles["sbs-col--image"])}
          style={
            imageAspectRatio
              ? {
                  aspectRatio: String(imageAspectRatio),
                }
              : {}
          }
        >
          {imageURL && <SmartImage src={imageURL} layout="static" />}
        </div>
      </div>
    </div>
  );
};

export default SidebySide;
