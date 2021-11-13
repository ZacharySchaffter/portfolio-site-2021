import clsx from "clsx";
import styles from "./FeaturedProject.module.scss";
import SmartImage from "components/SmartImage";
import { Parallax } from "components/Parallax";

export default ({ project, style = "dark", layout = "left" }) => {
  const roles = project?.projectRoles || [];
  const mediaDesktop = project?.featuredMedia?.fields;
  // const mediaMobile = project?.featuredMediaMobile?.fields;

  return (
    <Parallax
      render={({ offset }) => {
        const { center } = offset;
        return (
          <div
            className={clsx(
              styles["project"],
              styles[`project--style-${style}`],
              styles[`project--layout-${layout}`],
              { "bg-grain": style === "light" }
            )}
            style={{
              "--v-offset-grayscale":
                Math.pow(100 * Math.min(1, Math.abs(center.percent)), 1.1) +
                "%",
              "--v-offset-blur":
                2 * Math.min(1, Math.abs(center.percent)) + "px",
              "--v-offset-bg": Math.min(center.percent, 1) * 30 + 10 + "px",
            }}
          >
            <div className={styles["project__inner"]}>
              {/* COPY */}
              <div className={styles["project__copy"]}>
                {/* TITLE  */}
                <h2
                  className={clsx(styles["project__title"], "h1")}
                  data-text={project.title}
                >
                  {project.title}
                </h2>

                {/* SHORT DESCRIPTION  */}
                <div
                  className={clsx(
                    styles["project__short-desc"],
                    "ff-monospace"
                  )}
                >
                  <p>{project.descriptionShort}</p>
                </div>

                {/* ROLES */}
                {roles && roles.length && (
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
                {project.url && (
                  <a
                    href={project.url}
                    title={project.title}
                    className={clsx("btn", {
                      "btn--light": style === "dark",
                    })}
                  >
                    Visit
                  </a>
                )}
              </div>

              {/* MEDIA */}
              <a href={project.url} className={clsx(styles["project__media"])}>
                {/* MEDIA MOBILE */}
                {/* <SmartImage
                className={clsx({ "d-md-none": mediaDesktop?.file?.url })}
                src={mediaMobile?.file?.url}
                alt={mediaMobile?.title || project.title}
              /> */}

                {/* MEDIA DESKTOP */}
                <SmartImage
                  className={styles["smart-image"]}
                  src={mediaDesktop?.file?.url}
                  alt={mediaDesktop?.title || project.title}
                />
              </a>
            </div>
          </div>
        );
      }}
    />
  );
};
