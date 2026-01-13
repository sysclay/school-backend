// src/presentation/modules/personas/routes/File.routes.ts
import { Router } from "express";
import { FileController } from "../controllers/file.controller.js";
import { FileDatasourceImpl, FileRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { uploadImages } from "../../../middlewares/UploadFile.js";

export class FileRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new FileDatasourceImpl();
        const FileRepository = new FileRepositoryImpl(datasource);
        const controller = new FileController(FileRepository);

        // Solo imágenes
        router.post('/register-image',authMiddleware, uploadImages('../../public/imagen/persona').single('file'), controller.registerFile);
        router.get('/find/:filename',authMiddleware, controller.findFileByFilename);
        router.put('/update/:filename', authMiddleware, uploadImages('../../public/imagen/persona').single('file'), controller.updateFile);
        router.delete('/delete/:filename',authMiddleware, controller.deleteFile);

        return router;
    }
}