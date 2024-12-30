"use client";

import clsx from "clsx";
import styles from "./FeaturedProject.module.scss";
import SmartImage from "@/components/SmartImage";
import { WithParallax } from "@/context/Parallax";
import { ReactNode } from "react";

type Variant = "dark" | "light";

type Props = {
  title: string;
  description?: ReactNode;
  roles?: string[];
  image?: {
    url: string;
    altText: string;
  };
  link?: string;
  variant: Variant;
  layout: "left" | "right";
};

const FeaturedProject: React.FC<Props> = ({
  title,
  description,
  roles,
  link,
  image,
  variant = "dark",
  layout = "left",
}) => {
  return (
    <WithParallax
      // @ts-expect-error TODO: fix HOC render typing
      render={({ offset }) => {
        const { center } = offset;
        return (
          <div
            className={clsx(
              styles["project"],
              styles[`project--style-${variant}`],
              styles[`project--layout-${layout}`]
            )}
            style={{
              // @ts-expect-error - unknown css var
              "--v-offset-grayscale": center.percent
                ? Math.pow(100 * Math.min(1, Math.abs(center.percent)), 1.1) +
                  "%"
                : undefined,
              "--v-offset-bg": center.percent
                ? Math.min(center.percent, 1) * 30 + 10 + "px"
                : undefined,
            }}
            data-invert-header={variant === "dark"}
          >
            <div className={styles["project__inner"]}>
              {/* COPY */}
              <div className={styles["project__copy"]}>
                {/* TITLE  */}
                <h2
                  className={clsx(styles["project__title"], "h1")}
                  data-text={title}
                >
                  {title}
                </h2>

                {/* SHORT DESCRIPTION  */}
                <div
                  className={clsx(
                    styles["project__short-desc"],
                    "ff-monospace"
                  )}
                >
                  <p>{description}</p>
                </div>

                {/* FOOTNOTE */}
                {roles && roles.length > 0 && (
                  <div
                    className={clsx(styles["project__roles"], "ff-monospace")}
                  >
                    <span className="sr-only">
                      {roles.length > 1 ? "Roles:" : "Role:"}
                    </span>

                    <ul className="list-unstyled">{roles.join(", ")}</ul>
                  </div>
                )}

                {/* LINK */}
                {link && (
                  <a
                    href={link}
                    title={title}
                    className={clsx("btn", {
                      "btn--light": variant === "dark",
                    })}
                  >
                    Visit
                  </a>
                )}
              </div>

              {/* MEDIA */}
              {image && (
                <a href={link} className={clsx(styles["project__media"])}>
                  {/* MEDIA DESKTOP */}
                  <SmartImage
                    className={clsx(styles["smart-image"])}
                    src={image.url}
                    alt={image.altText}
                  />
                </a>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default FeaturedProject;
