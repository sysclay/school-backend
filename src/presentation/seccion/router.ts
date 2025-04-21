import { Router } from "express";
import { SeccionController } from "./controller.js";
import { SeccionDatasourceImpl, SeccionRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class SeccionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new SeccionDatasourceImpl();
        const seccionooRepository = new SeccionRepositoryImpl(datasource);
        const controller = new SeccionController(seccionooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN), controller.registerSeccion);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findSeccion);

        return router
    }
}