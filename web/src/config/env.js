export const env = {
  apiBase:
    import.meta.env.VITE_API_BASE || "/api",

  mode: import.meta.env.MODE,

  production: import.meta.env.PROD,

  development: import.meta.env.DEV,
};