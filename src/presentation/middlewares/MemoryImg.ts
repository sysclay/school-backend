import multer from "multer";

// Middleware para guardar en memoria las imagenes
export const memoryImagesFotos = () => {
    const storage = multer.memoryStorage();
    const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
        if (/^image\//.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'), false); 
        }
    };

    return multer({ storage, fileFilter });
}
