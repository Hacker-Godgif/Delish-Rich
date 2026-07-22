import 'dotenv/config';
import { connectDb } from '../db.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Project from '../models/Project.js';

await connectDb();

const categories = [
  { slug: 'furniture', name: 'Furniture', order: 1 },
  { slug: 'lighting', name: 'Lighting', order: 2 },
  { slug: 'textiles', name: 'Textiles', order: 3 },
  { slug: 'decor', name: 'Decor', order: 4 },
];

const products = [
  { slug: 'velvet-lounge-chair', name: 'Velvet Lounge Chair', category: 'furniture', price: 1200, description: 'Hand-tufted velvet lounge with brass legs.', images: [], featured: true },
  { slug: 'brass-pendant-lamp', name: 'Brass Pendant Lamp', category: 'lighting', price: 650, description: 'Polished brass pendant, hand-finished.', images: [], featured: true },
  { slug: 'linen-throw', name: 'Linen Throw', category: 'textiles', price: 180, description: 'Stonewashed Belgian linen throw.', images: [] },
];

const projects = [
  { slug: 'the-shore-residence', title: 'The Shore Residence', location: 'Goa, India', year: 2025, description: 'Coastal villa fit-out — 12 rooms, custom millwork.', coverImage: '', images: [] },
  { slug: 'maison-bleu', title: 'Maison Bleu', location: 'Paris, France', year: 2024, description: 'Boutique hotel lobby & suites.', coverImage: '', images: [] },
];

await Category.deleteMany({});
await Category.insertMany(categories);

for (const p of products) {
  await Product.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
}
for (const p of projects) {
  await Project.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
}

console.log('Seeded.');
process.exit(0);
