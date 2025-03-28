import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import url from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File successfully uploaded to Cloudinary:", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    const parsedUrl = url.parse(fileUrl, true);
    const pathname = parsedUrl.pathname;

    const uploadIndex = pathname.indexOf("/upload/");
    if (uploadIndex === -1) {
      throw new Error("Invalid Cloudinary URL format");
    }

    const publicIdWithExtension = pathname.substring(uploadIndex + 8);
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);

    console.log("File deleted from Cloudinary:", publicId);
  } catch (error) {
    console.error("Cloudinary error while deleting file:", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
