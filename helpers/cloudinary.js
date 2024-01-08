import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (imageUrl) => {
  const publicId = imageUrl.split("/").pop().split(".")[0];
  try {
    await cloudinary.uploader.destroy(`user_avatars/${publicId}`);
  } catch (error) {
    throw new Error("Error deleting image from Cloudinary: " + error.message);
  }
};

export default cloudinary;
