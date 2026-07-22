import { request } from "./client";

export const categoriesApi = {
  getAll() {
    return request("/categories");
  },
};