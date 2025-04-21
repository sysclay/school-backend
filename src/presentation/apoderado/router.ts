import { Router } from "express";
import { ApoderadoController } from "./controller.js";
import { ApoderadoDatasourceImpl, ApoderadoRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class ApoderadoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ApoderadoDatasourceImpl();
        const apoderadoRepository = new ApoderadoRepositoryImpl(datasource);
        const controller = new ApoderadoController(apoderadoRepository);

        router.post('/register',authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerApoderado);
        router.get('/search/:id',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findApoderado);
        router.get('/filter',authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.DOCENTE), controller.filterApoderadoAlumno);

        return router
    }
}