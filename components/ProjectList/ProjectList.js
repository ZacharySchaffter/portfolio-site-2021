export default ({ projects }) => {
  return (
    <ul className="projects">
      {projects.map((project) => (
        <li className="project">
          {/* COPY */}
          <div className="project__copy">
            <h2 className="project__title">{project.title}</h2>
            <div className="project__short-description">
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
        </li>
      ))}
    </ul>
  );
};
