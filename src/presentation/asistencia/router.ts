import { Router } from "express";
import { AsistenciaController } from "./controller.js";
import { AsistenciaDatasourceImpl, AsistenciaRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class AsistenciaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AsistenciaDatasourceImpl();
        const asistenciaRepository = new AsistenciaRepositoryImpl(datasource);
        const controller = new AsistenciaController(asistenciaRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE), controller.registerAsistencia);
        router.put('/entrada/:id',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE), controller.registerEntradaAsistencia);
        router.put('/salida/:id',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE), controller.registerSalidaAsistencia);
        router.get('/search/:id',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findAsistencia);
        router.get('/filter-clase-lectiva',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.filterClaseLectiva);

        return router
    }
}