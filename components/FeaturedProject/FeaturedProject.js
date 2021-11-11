import clsx from "clsx";
import styles from "./FeaturedProject.module.scss";

import SmartImage from "components/SmartImage";

export default ({ project, style = "dark", layout = "left" }) => {
  const roles = project?.projectRoles || [];
  const mediaDesktop = project?.featuredMedia?.fields;
  const mediaMobile = project?.featuredMediaMobile?.fields;

  return (
    <div
      className={clsx(
        styles["project"],
        styles[`project--style-${style}`],
        styles[`project--layout-${layout}`],
        { "bg-grain": style === "light" }
      )}
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
          <div className={styles["project__short-desc"]}>
            <p>{project.descriptionShort}</p>
          </div>

          {/* ROLES */}
          {roles && roles.length && (
            <div className={styles["project__roles"]}>
              <span>{roles.length > 1 ? "Roles:" : "Role:"}</span>

              <ul className="list-unstyled">{roles.join(", ")}</ul>
            </div>
          )}

          {/* LINK */}
          {project.url && (
            <a
              href={project.url}
              title={project.title}
              className={clsx("btn", { "btn--light": style === "dark" })}
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
            className={clsx({})}
            src={mediaDesktop?.file?.url}
            alt={mediaDesktop?.title || project.title}
          />
        </a>
      </div>
    </div>
  );
};
