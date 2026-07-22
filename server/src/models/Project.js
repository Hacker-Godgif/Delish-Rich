import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    location: String,
    year: Number,
    description: String,
    coverImage: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
