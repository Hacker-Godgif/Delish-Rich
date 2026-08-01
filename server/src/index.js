import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDb } from './config/db.js';
import products from './routes/products.routes.js';
import projects from './routes/projects.routes.js';
import categories from './routes/categories.routes.js';
import inquiries from './routes/inquiries.routes.js';
// import upload from './routes/upload.js';
// import bulkImport from './routes/bulkImport.js';
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use('/api/products', products);
app.use('/api/projects', projects);
app.use('/api/categories', categories);
app.use('/api/inquiries', inquiries);
// app.use('/api/upload', upload);
// app.use('/api/import', bulkImport);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
await connectDb();
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
