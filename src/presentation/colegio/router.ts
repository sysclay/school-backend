import { Router } from "express";
import { ColegioController } from "./controller.js";
import { ColegioDatasourceImpl, ColegioRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class ColegioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ColegioDatasourceImpl();
        const ColegioRepository = new ColegioRepositoryImpl(datasource);
        const controller = new ColegioController(ColegioRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN,), controller.registerColegio);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findColegio);

        return router
    }
}