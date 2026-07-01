import { Router } from "express";
import { SeccionController } from "../controllers/seccion.controller.js";
import { SeccionDatasourceImpl, SeccionRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class SeccionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new SeccionDatasourceImpl();
        const seccionooRepository = new SeccionRepositoryImpl(datasource);
        const controller = new SeccionController(seccionooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.SECCIONES), controller.register);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.SECCIONES), controller.find);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.SECCIONES ),controller.updateAll);

        return router
    }
}