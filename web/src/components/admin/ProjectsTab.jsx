import { useEffect, useState } from "react";
import { api } from "../../api";

const initialForm = {
  slug: "",
  title: "",
  location: "",
  year: "",
  description: "",
};

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);

  const loadProjects = () => {
    api.projects()
      .then(setProjects)
      .catch(console.error);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange =
    (field) =>
    (event) =>
      setForm({
        ...form,
        [field]: event.target.value,
      });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await api.createProject({
      ...form,
      year: form.year
        ? Number(form.year)
        : undefined,
    });

    setForm(initialForm);

    loadProjects();
  };

  const handleDelete = async (id) => {
    await api.deleteProject(id);

    loadProjects();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr) auto",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <input
          placeholder="Slug"
          required
          value={form.slug}
          onChange={handleChange("slug")}
        />

        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={handleChange("title")}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={handleChange("location")}
        />

        <input
          placeholder="Year"
          value={form.year}
          onChange={handleChange("year")}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={handleChange("description")}
        />

        <button className="btn btn-solid">
          Add
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Slug</th>
            <th>Title</th>
            <th>Location</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.slug}</td>
              <td>{project.title}</td>
              <td>{project.location}</td>
              <td>{project.year}</td>

              <td>
                <button
                  className="filter-chip"
                  onClick={() =>
                    handleDelete(project._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}