import { Router } from "express";
import { DocenteController } from "./controller.js";
import { DocenteDatasourceImpl, DocenteRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class DocenteRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new DocenteDatasourceImpl();
        const docenteRepository = new DocenteRepositoryImpl(datasource);
        const controller = new DocenteController(docenteRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN), controller.registerDocente);
        router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findDocente);

        return router
    }
}