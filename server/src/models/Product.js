import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, index: true },
    description: String,
    price: Number,
    images: [String],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
