# 🏡 Delish Rich Hospitality

A modern full-stack web application for showcasing premium interior, furniture, and hospitality projects.

Built with **React**, **Vite**, **Node.js**, **Express**, and **MongoDB**, the platform allows customers to explore products and completed projects while providing an admin dashboard for content management.

---

## 📸 Preview

> Add screenshots here after deployment

| Home | Catalogue | Projects |
|------|-----------|----------|
| Screenshot | Screenshot | Screenshot |

---

# ✨ Features

## Customer

- 🏠 Modern responsive landing page
- 🛋 Browse product catalogue
- 🔍 Product detail page
- 🏗 View completed projects
- 📩 Contact / Inquiry form
- 📱 Fully responsive design
- ⚡ Fast loading using Vite

---

## Admin

- Secure Admin Login
- Product Management
- Project Management
- Bulk Image Upload
- CSV Product Import
- JWT Authentication
- Image Gallery Management

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- JavaScript (ES6+)
- CSS3

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary

---

## Deployment

- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas
- Images → Cloudinary

---

# 📂 Project Structure

```
Delish-Rich/
│
├── web/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/delish-rich.git

cd delish-rich
```

---

# Install Frontend

```bash
cd web

npm install
```

Run

```bash
npm run dev
```

---

# Install Backend

```bash
cd server

npm install
```

Run

```bash
npm run dev
```

---

# Environment Variables

## Frontend

Create

```
web/.env.development
```

```env
VITE_API_BASE=http://localhost:5000/api
```

Create

```
web/.env.production
```

```env
VITE_API_BASE=https://api.yourdomain.com/api
```

---

## Backend

Create

```
server/.env
```

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

# API Modules

The frontend uses a modular API layer.

```
api/
│
├── client.js
├── auth.js
├── products.js
├── projects.js
├── categories.js
├── inquiries.js
├── uploads.js
└── index.js
```

---

# Future Improvements

- Product Search
- Product Filtering
- Wishlist
- Image Optimization
- Analytics Dashboard
- Pagination
- Order Management
- Inventory Management
- Email Notifications
- Payment Gateway Integration

---

# Deployment

Frontend

```
Vercel
```

Backend

```
Railway
```

Database

```
MongoDB Atlas
```

Domain

```
https://yourdomain.com
```

API

```
https://api.yourdomain.com
```

---

# Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

# License

This project is licensed under the MIT License.

---

# Author

**Om Sinha**

GitHub: https://github.com/Hacker-Godgif

LinkedIn: https://linkedin.com/in/omsinha
