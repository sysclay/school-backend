import { Router } from "express";
import { FcmController } from "./controller.js";
import { FcmDatasourceImpl, FcmRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class FcmRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new FcmDatasourceImpl();
        const fcmRepository = new FcmRepositoryImpl(datasource);
        const controller = new FcmController(fcmRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.registerFcm);
        // router.post('/register', controller.registerFcm);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findFcm);
        router.get('/filter', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.filterFcm);
        router.put('/update/:id', controller.updateFcm);

        return router
    }
}