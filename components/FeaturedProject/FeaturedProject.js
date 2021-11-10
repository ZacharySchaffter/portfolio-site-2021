import clsx from "clsx";
import styles from "./FeaturedProject.module.scss";

export default ({ project, style = "dark", layout = "left" }) => {
  const roles = project?.projectRoles || [];

  return (
    <div
      className={clsx(
        styles["project"],
        styles[`project--style-${style}`],
        styles[`project--layout-${layout}`]
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
            <div classNae={styles["project__roles"]}>
              <span>{roles.length > 1 ? "Roles:" : "Role:"}</span>

              <ul className="list-unstyled">{roles.join(", ")}</ul>
            </div>
          )}

          {/* LINK */}
        </div>

        {/* MEDIA */}
        <div className="project__media">
          <img
            src={project.featuredMedia?.src}
            alt={project.featuredMedia?.alt || project.title}
          />
        </div>
      </div>
    </div>
  );
};
