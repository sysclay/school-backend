import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Middleware para subir solo imágenes
export const uploadImages = (folder: string) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            cb(null, path.join(__dirname, folder));
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
        if (/^image\//.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'), false); 
        }
    };

    return multer({ storage, fileFilter });
}
