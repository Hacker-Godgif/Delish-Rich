import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    year: {
      type: Number,
      min: 2000,
      max: new Date().getFullYear() +10,
    },

    description: {
      type: String,
      default: "",
    },

    coverImage: {
      _id: false,

      url: {
        type: String,
        default: "",
      },

      public_id: {
        type: String,
        default: "",
      },
    },

    images: [
      {
        _id: false,

        url: {
          type: String,
          required: true,
        },

        public_id: {
          type: String,
          required: true,
        },
      },
    ],
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

export default mongoose.model("Project", ProjectSchema);