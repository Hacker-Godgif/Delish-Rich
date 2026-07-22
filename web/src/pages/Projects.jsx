import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';


export default function Projects() {
  const [projects, setProjects] = useState([]);
  api.projects()
  .then(setProjects)
  .catch(console.error);

  return (
    <section className="section container">
      <div className="eyebrow">Projects</div>
      <h1>Selected work.</h1>
      <div className="grid grid-2" style={{ marginTop: '2rem' }}>
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
        {projects.length === 0 && (
        <p style={{ color: "var(--bone-dim)" }}>
            No projects yet.
        </p>
    )}
      </div>
    </section>
  );
}
