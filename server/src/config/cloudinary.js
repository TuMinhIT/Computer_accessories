import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary connected");
  } catch (error) {
    console.error("Failed to connect to Cloudinary:", error);
    process.exit(1);
  }
};
export { cloudinary };
export default connectCloudinary;
