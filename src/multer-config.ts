import { diskStorage } from "multer";

export const multerConfig = {
  storage: diskStorage({
    destination: "./uploads", // Директория для сохранения файлов
    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`;
      callback(null, uniqueSuffix); // Генерация уникального имени файла
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Ограничение размера файла (10 МБ)
  },
};
