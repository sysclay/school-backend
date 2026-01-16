// src/presentation/modules/personas/routes/File.routes.ts
import { Router } from "express";
import { QRDatasourceImpl, QRRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { uploadImages } from "../../../middlewares/UploadFile.js";
import { QRController } from "../controllers/qr.controller.js";

export class QRRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new QRDatasourceImpl();
        const QRRepository = new QRRepositoryImpl(datasource);
        const controller = new QRController(QRRepository);

        // Solo imágenes
        // router.post('/register-image',authMiddleware, uploadImages('../../public/imagen/persona').single('file'), controller.registerFile);
        router.post('/save/:filename',authMiddleware, controller.saveFilenameQR);
        router.get('/find/:filename',authMiddleware, controller.findFileByFilename);
        // router.put('/update/:filename', authMiddleware, uploadImages('../../public/imagen/persona').single('file'), controller.updateFile);
        // router.delete('/delete/:filename',authMiddleware, controller.deleteFile);

        return router;
    }
}