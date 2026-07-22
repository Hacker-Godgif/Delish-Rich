export default function ProjectInfo({ project }) {
  return (
    <>
      <div
        className="eyebrow"
        style={{ marginTop: "1rem" }}
      >
        {project.location}
        {project.year ? ` · ${project.year}` : ""}
      </div>

      <h1>{project.title}</h1>

      <p
        style={{
          color: "var(--bone-dim)",
          maxWidth: 680,
        }}
      >
        {project.description}
      </p>
    </>
  );
}