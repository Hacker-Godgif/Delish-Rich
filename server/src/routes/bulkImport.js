import { Router } from 'express';
import multer from 'multer';
import { parse } from 'csv-parse/sync';
import Product from '../models/Product.js';
import { requireAdmin } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });
const r = Router();

// CSV columns: slug,name,category,description,price,images (images = pipe-separated urls)
r.post('/products', requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No CSV uploaded' });
  const rows = parse(req.file.buffer.toString('utf8'), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  const docs = rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    category: row.category || undefined,
    description: row.description || undefined,
    price: row.price ? Number(row.price) : undefined,
    images: row.images ? row.images.split('|').map((s) => s.trim()).filter(Boolean) : [],
    featured: row.featured === 'true',
  }));
  const result = await Product.bulkWrite(
    docs.map((d) => ({
      updateOne: { filter: { slug: d.slug }, update: { $set: d }, upsert: true },
    }))
  );
  res.json({ inserted: result.upsertedCount, updated: result.modifiedCount });
});

export default r;
