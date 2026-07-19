import cloudinary from "../config/cloudinary.js";
import fs from "fs";

class uploadService {
  async uploadImages(files) {
    const folder = process.env.FOLDER;
    const uploaded = [];
    for (const file of files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder,
          transformation: [
            { width: 1200, height: 1200, crop: "limit" },
            { quality: "auto" },
            { format: "webp" },
          ],
        });
        uploaded.push(result.secure_url);

        // Xóa file tạm sau khi upload thành công
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      } catch (err) {
        // Xóa file tạm nếu lỗi
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        // Trích xuất thông tin lỗi để gửi về Client
        const errorDetail = err.message || JSON.stringify(err);
        const errorName = err.name || "UnknownError";

        // Ném lỗi mới có chứa chi tiết
        throw new Error(`Upload Failed [${errorName}]: ${errorDetail}`);
        // -------------------------------------
      }
    }
    return uploaded;
  }

  async deleteImages(urls = []) {
    if (!urls.length) return;

    const extractPublicId = (url) => {
      const clean = String(url).split("?")[0];
      const match = clean.match(/\/upload\/(?:v\d+\/)?(.+?)\.\w+$/);
      if (match) return decodeURIComponent(match[1]);
      return decodeURIComponent(
        clean
          .split("/")
          .pop()
          ?.replace(/\.[^/.]+$/, "") || "",
      );
    };

    const publicIds = urls.map(extractPublicId).filter(Boolean);
    if (!publicIds.length) return;

    try {
      const result = await cloudinary.api.delete_resources(publicIds);
      return result;
    } catch (err) {
      console.error("Cloudinary cleanup error:", err.message);
      // Fallback: xóa từng cái
      for (const pid of publicIds) {
        try {
          await cloudinary.uploader.destroy(pid, { resource_type: "image" });
        } catch (e) {
          /* ignore */
        }
      }
    }
  }
}

export default new uploadService();
