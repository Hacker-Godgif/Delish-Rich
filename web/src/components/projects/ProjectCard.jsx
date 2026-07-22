import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="card"
    >
      <div
        className="card-img"
        style={{
          backgroundImage: project.coverImage
            ? `url(${project.coverImage})`
            : "none",
        }}
      />

      <div className="card-body">
        <div className="meta">
          {project.location}
          {project.year ? ` · ${project.year}` : ""}
        </div>

        <h3>{project.title}</h3>
      </div>
    </Link>
  );
}