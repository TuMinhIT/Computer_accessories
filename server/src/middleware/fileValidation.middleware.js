import mime from "mime-types";

export const validateFileType = (allowedTypes = []) => {
  return (req, res, next) => {
    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({
        message: "No files provided",
        status: 400,
      });
    }

    for (const file of files) {
      const mimeType = file.mimetype;
      const isValidType = allowedTypes.some((type) => {
        if (type.includes("*")) {
          // Handle wildcard types like 'image/*'
          return mimeType.startsWith(type.replace("*", ""));
        }
        return mimeType === type;
      });

      if (!isValidType) {
        return res.status(400).json({
          message: `Invalid file type: ${mimeType}. Allowed types: ${allowedTypes.join(
            ", "
          )}`,
          status: 400,
        });
      }

      // Additional validation for file size
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        return res.status(413).json({
          message: `File too large: ${file.originalname}. Maximum size is 10MB`,
          status: 413,
        });
      }
    }

    next();
  };
};

export const validateImageFiles = validateFileType([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]);

export const validateDocumentFiles = validateFileType([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
]);

export const validateAllFiles = validateFileType([
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "application/json",
  "application/zip",
  "application/x-rar-compressed",
]);
