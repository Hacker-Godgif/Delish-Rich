import mongoose from "mongoose";

export async function connectDb() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is missing");
    }

    await mongoose.connect(uri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(
      "MongoDB Connection Failed"
    );

    console.error(error.message);

    process.exit(1);
  }
}