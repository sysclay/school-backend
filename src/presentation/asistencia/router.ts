import { Router } from "express";
import { AsistenciaController } from "./controller.js";
import { AsistenciaDatasourceImpl, AsistenciaRepositoryImpl } from "../../infraestructure/index.js";


export class AsistenciaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AsistenciaDatasourceImpl();
        const asistenciaRepository = new AsistenciaRepositoryImpl(datasource);
        const controller = new AsistenciaController(asistenciaRepository);

        router.post('/register',controller.registerAsistencia);
        router.put('/entrada/:id',controller.registerEntradaAsistencia);
        router.put('/salida/:id',controller.registerSalidaAsistencia);
        router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findAsistencia);

        return router
    }
}