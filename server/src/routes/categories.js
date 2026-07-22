import { Router } from 'express';
import Category from '../models/Category.js';
import { requireAdmin } from '../middleware/auth.js';

const r = Router();

r.get('/', async (_req, res) => {
  res.json(await Category.find().sort({ order: 1, name: 1 }));
});

r.post('/', requireAdmin, async (req, res) => {
  res.status(201).json(await Category.create(req.body));
});

r.put('/:id', requireAdmin, async (req, res) => {
  res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

r.delete('/:id', requireAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default r;
