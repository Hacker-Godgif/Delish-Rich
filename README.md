# Delish Rich — Local Edition

Self-contained Node + MongoDB + React version of the website. Runs entirely on your laptop.

## Stack

- **Backend:** Node.js, Express, Mongoose (MongoDB), Multer (file uploads)
- **Frontend:** React 18 + Vite + React Router
- **Database:** MongoDB (local or Atlas — your choice)
- **Storage:** Local filesystem (`server/uploads/`)

## One-time setup

### 1. Install Node.js (>=18) and MongoDB

- **Node:** https://nodejs.org (LTS)
- **MongoDB Community (local):** https://www.mongodb.com/try/download/community
  Start it: `mongod` (Mac/Linux) or run as a Windows service.
- **Or MongoDB Atlas (free cloud, no install):** https://www.mongodb.com/atlas — create a free cluster, get the connection string.

### 2. Backend

```bash
cd local-app/server
npm install
cp .env.example .env
# edit .env if you want to change MONGO_URI or ADMIN_TOKEN
npm run dev
```

API runs on http://localhost:4000

### 3. Frontend

In a second terminal:

```bash
cd local-app/web
npm install
npm run dev
```

Site runs on http://localhost:5173

### 4. (Optional) Seed sample data

```bash
cd local-app/server
npm run seed
```

## Admin panel

Open http://localhost:5173/admin — paste the `ADMIN_TOKEN` from your `.env` to unlock.

You can:
- Add / edit / delete products and projects
- Drag-and-drop a whole folder of images to bulk upload
- Import a CSV of products

## Deploying later

Any Node host works: Railway, Render, Fly, your own VPS. Point `MONGO_URI` at MongoDB Atlas, build the frontend (`npm run build` in `web/`), and serve the `web/dist` from Express (or any static host).

## Folder layout

```
local-app/
  server/   Express + Mongo API
  web/      React + Vite frontend
```
