import "dotenv/config";

import { connectDb } from "../utils/db.js";

import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Project from "../models/Project.js";

try {
  await connectDb();

  /* -------------------------------------------------------------------------- */
  /*                                 CATEGORIES                                 */
  /* -------------------------------------------------------------------------- */

  const categories = [
    {
      slug: "furniture",
      name: "Furniture",
      order: 1,
    },
    {
      slug: "lighting",
      name: "Lighting",
      order: 2,
    },
    {
      slug: "textiles",
      name: "Textiles",
      order: 3,
    },
    {
      slug: "decor",
      name: "Decor",
      order: 4,
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                  PRODUCTS                                  */
  /* -------------------------------------------------------------------------- */

  await Category.deleteMany({});

  const createdCategories = await Category.insertMany(
    categories
  );

  const categoryMap = {};

  createdCategories.forEach((category) => {
    categoryMap[category.slug] = category._id;
  });

  const products = [
    {
      slug: "velvet-lounge-chair",
      name: "Velvet Lounge Chair",

      category: categoryMap.furniture,

      price: 1200,

      description:
        "Hand-tufted velvet lounge with brass legs.",

      featured: true,

      images: [],
    },

    {
      slug: "brass-pendant-lamp",
      name: "Brass Pendant Lamp",

      category: categoryMap.lighting,

      price: 650,

      description:
        "Polished brass pendant, hand-finished.",

      featured: true,

      images: [],
    },

    {
      slug: "linen-throw",
      name: "Linen Throw",

      category: categoryMap.textiles,

      price: 180,

      description:
        "Stonewashed Belgian linen throw.",

      featured: false,

      images: [],
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                   PROJECTS                                 */
  /* -------------------------------------------------------------------------- */

  const projects = [
    {
      slug: "the-shore-residence",

      title: "The Shore Residence",

      location: "Goa, India",

      year: 2025,

      description:
        "Coastal villa fit-out — 12 rooms, custom millwork.",

      coverImage: {
        url: "",
        public_id: "",
      },

      images: [],
    },

    {
      slug: "maison-bleu",

      title: "Maison Bleu",

      location: "Paris, France",

      year: 2024,

      description:
        "Boutique hotel lobby & suites.",

      coverImage: {
        url: "",
        public_id: "",
      },

      images: [],
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                   RESET                                    */
  /* -------------------------------------------------------------------------- */

  await Product.deleteMany({});
  await Project.deleteMany({});

  await Product.insertMany(products);

  await Project.insertMany(projects);

  console.log("Database seeded successfully ✅");

  process.exit(0);
} catch (error) {
  console.error("Seeding failed ❌");

  console.error(error);

  process.exit(1);
}