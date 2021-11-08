import clsx from "clsx";
import styles from "./FeaturedProject.module.scss";

export default ({ project, style = "dark", layout = "left" }) => {
  return (
    <div
      className={clsx(
        styles["project"],
        styles[`project-style-${style}`],
        style[`project-layout-`]
      )}
    >
      {/* COPY */}
      <div className={styles["project-copy"]}>
        {/* TITLE  */}
        <h2 className={clsx(styles["project-title"], "h1")}>{project.title}</h2>

        {/* SHORT DESCRIPTION  */}
        <div className={styles["project-short-desc"]}>
          {project.descriptionShort}
        </div>
      </div>

      {/* MEDIA */}
      <div className="project__media">
        <img
          src={project.featuredMedia?.src}
          alt={project.featuredMedia?.alt || project.title}
        />
      </div>
    </div>
  );
};
