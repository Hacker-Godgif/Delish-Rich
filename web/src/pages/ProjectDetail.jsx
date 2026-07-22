import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import ProjectGallery from "../components/project/ProjectGallery";
import ProjectInfo from "../components/project/ProjectInfo";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
  api.project(slug)
    .then(setProject)
    .catch(console.error);
}, [slug]);

  if (!project) return <section className="section container">Loading…</section>;
  
  return (
    <section className="section container">
      <Link to="/projects" style={{ color: 'var(--bone-dim)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>← Projects</Link>
       <ProjectInfo project={project} />

  <ProjectGallery images={project.images} />
    </section>
  );
}
