import { Router } from "express";
// import { AsistenciaController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { AsistenciaDatasourceImpl, AsistenciaRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { AsistenciaController } from "../controllers/asistencia.controller.js";

export class AsistenciaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AsistenciaDatasourceImpl();
        const AsistenciaRepository = new AsistenciaRepositoryImpl(datasource);
        const controller = new AsistenciaController(AsistenciaRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.ASISTENCIA), controller.registerAsistencia);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        // router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_GRADOS), controller.findByIdColegio);
        // router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.COLEGIOS_GRADOS), controller.findAsistencia);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA), controller.filter);
        router.patch('/salida', authMiddleware, authorizeRoles(Permissiones.UPDATE_OWN, Modulos.ASISTENCIA), controller.update);

        return router
    }
}