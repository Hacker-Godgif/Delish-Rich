import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    slug: {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  unique: true,
  index: true,
},

    name: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export default mongoose.model('Category', CategorySchema);
