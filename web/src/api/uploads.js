import {
  request,
  adminHeaders,
} from "./client";

export const uploadsApi = {
  uploadBulk(files) {
    const formData = new FormData();

    files.forEach((file) =>
      formData.append("files", file)
    );

    return request("/upload/bulk", {
      method: "POST",

      headers: adminHeaders(),

      body: formData,
    });
  },

  importProductsCsv(file) {
    const formData = new FormData();

    formData.append("file", file);

    return request("/import/products", {
      method: "POST",

      headers: adminHeaders(),

      body: formData,
    });
  },
};