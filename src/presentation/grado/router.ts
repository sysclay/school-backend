import { Router } from "express";
import { GradoController } from "./controller.js";
import { GradoDatasourceImpl, GradoRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class GradoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new GradoDatasourceImpl();
        const GradoooRepository = new GradoRepositoryImpl(datasource);
        const controller = new GradoController(GradoooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerGrado);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findGrado);

        return router
    }
}