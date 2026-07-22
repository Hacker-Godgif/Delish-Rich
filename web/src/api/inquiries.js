import { request } from "./client";

export const inquiriesApi = {
  submit(body) {
    return request("/inquiries", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });
  },
};