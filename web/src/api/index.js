import { productsApi } from "./products";
import { projectsApi } from "./projects";
import { categoriesApi } from "./categories";
import { inquiriesApi } from "./inquiries";
import { uploadsApi } from "./uploads";

export const api = {
  // Products
  products: productsApi.getAll,
  product: productsApi.getBySlug,
  createProduct: productsApi.create,
  updateProduct: productsApi.update,
  deleteProduct: productsApi.delete,

  // Projects
  projects: projectsApi.getAll,
  project: projectsApi.getBySlug,
  createProject: projectsApi.create,
  deleteProject: projectsApi.delete,

  // Categories
  categories: categoriesApi.getAll,

  // Contact
  submitInquiry: inquiriesApi.submit,

  // Uploads
  uploadBulk: uploadsApi.uploadBulk,
  importProductsCsv:
    uploadsApi.importProductsCsv,
};

export {
  productsApi,
  projectsApi,
  categoriesApi,
  inquiriesApi,
  uploadsApi,
};