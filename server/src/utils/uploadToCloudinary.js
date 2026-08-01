import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "delish-rich/products",
    });

    // Delete the temporary file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    // Delete temp file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

export default uploadToCloudinary;