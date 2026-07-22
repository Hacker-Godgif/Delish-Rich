import { request, adminHeaders } from "./client";

export const productsApi = {
  getAll(params = {}) {
    const query = new URLSearchParams(params);

    return request(
      "/products" +
        (query.toString()
          ? `?${query.toString()}`
          : "")
    );
  },

  getBySlug(slug) {
    return request(`/products/${slug}`);
  },

  create(body) {
    return request("/products", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...adminHeaders(),
      },

      body: JSON.stringify(body),
    });
  },

  update(id, body) {
    return request(`/products/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        ...adminHeaders(),
      },

      body: JSON.stringify(body),
    });
  },

  delete(id) {
    return request(`/products/${id}`, {
      method: "DELETE",

      headers: adminHeaders(),
    });
  },
};