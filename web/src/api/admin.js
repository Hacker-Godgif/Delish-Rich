import { request } from "./client";

export const adminApi = {
  login(credentials) {
    return request("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};