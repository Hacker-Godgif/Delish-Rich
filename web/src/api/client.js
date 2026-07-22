import { env } from "../config/env";

const BASE = env.apiBase;

export function getAdminToken() {
  return localStorage.getItem("adminToken") || "";
}

export function adminHeaders() {
  const token = getAdminToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export async function request(path, options = {}) {
  const response = await fetch(BASE + path, options);

  if (!response.ok) {
    throw new Error(
      (await response.text()) || response.statusText
    );
  }

  const contentType = response.headers.get(
    "content-type"
  );

  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    return response.json();
  }

  return response.text();
}