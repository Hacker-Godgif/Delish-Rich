import { Router } from 'express';
import Project from '../models/Project.js';
import { requireAdmin } from '../middleware/auth.js';

const r = Router();

r.get('/', async (_req, res) => {
  const items = await Project.find().sort({ year: -1, createdAt: -1 });
  res.json(items);
});

r.get('/:slug', async (req, res) => {
  const item = await Project.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

r.post('/', requireAdmin, async (req, res) => {
  const item = await Project.create(req.body);
  res.status(201).json(item);
});

r.put('/:id', requireAdmin, async (req, res) => {
  const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

r.delete('/:id', requireAdmin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default r;
