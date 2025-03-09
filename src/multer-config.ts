import { diskStorage } from "multer";

export const multerConfig = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`;
      callback(null, uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
