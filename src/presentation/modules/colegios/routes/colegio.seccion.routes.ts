import { Router } from "express";
// import { ColegioSeccionController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { ColegioSeccionDatasourceImpl, ColegioSeccionRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { ColegioSeccionController } from "../controllers/colegio.seccion.controller.js";

export class ColegioSeccionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ColegioSeccionDatasourceImpl();
        const ColegioSeccionRepository = new ColegioSeccionRepositoryImpl(datasource);
        const controller = new ColegioSeccionController(ColegioSeccionRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.COLEGIOS_SECCIONES), controller.registerColegioSeccion);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_SECCIONES), controller.findByIdColegio);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.COLEGIOS_SECCIONES), controller.findColegioSeccion);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_SECCIONES), controller.filter);
        router.patch('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.COLEGIOS_SECCIONES), controller.updateIsActive);

        return router
    }
}