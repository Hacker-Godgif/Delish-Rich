import { Router } from 'express';
import Inquiry from '../models/Inquiry.js';
import { requireAdmin } from '../middleware/auth.js';

const r = Router();

r.post('/', async (req, res) => {
  const item = await Inquiry.create(req.body);
  res.status(201).json({ ok: true, id: item._id });
});

r.get('/', requireAdmin, async (_req, res) => {
  res.json(await Inquiry.find().sort({ createdAt: -1 }));
});

r.delete('/:id', requireAdmin, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default r;
