import { Router } from 'express';
import Product from '../models/Product.js';
import { requireAdmin } from '../middleware/auth.js';

const r = Router();

r.get('/', async (req, res) => {
  const { category, featured } = req.query;
  const q = {};
  if (category) q.category = category;
  if (featured) q.featured = featured === 'true';
  const items = await Product.find(q).sort({ createdAt: -1 });
  res.json(items);
});

r.get('/:slug', async (req, res) => {
  const item = await Product.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

r.post('/', requireAdmin, async (req, res) => {
  const item = await Product.create(req.body);
  res.status(201).json(item);
});

r.put('/:id', requireAdmin, async (req, res) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

r.delete('/:id', requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default r;
