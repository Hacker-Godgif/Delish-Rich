import { request, adminHeaders } from "./client";

export const projectsApi = {
  getAll() {
    return request("/projects");
  },

  getBySlug(slug) {
    return request(`/projects/${slug}`);
  },

  create(body) {
    return request("/projects", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...adminHeaders(),
      },

      body: JSON.stringify(body),
    });
  },

  delete(id) {
    return request(`/projects/${id}`, {
      method: "DELETE",

      headers: adminHeaders(),
    });
  },
};