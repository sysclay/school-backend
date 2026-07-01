import { Router } from "express";
import { DirectorController } from "../controllers/director.controller.js";
import { DirectorDatasourceImpl, DirectorRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";

import { Permissiones } from '../../../../config/index.js';
import { Modulos } from '../../../../config/index.js';

export class DirectorRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new DirectorDatasourceImpl();
        const DirectorRepository = new DirectorRepositoryImpl(datasource);
        const controller = new DirectorController(DirectorRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.DIRECTORES), controller.register);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.DIRECTORES), controller.findAll);
        router.get('/colegio/:id', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.DIRECTORES), controller.findByIdColegio);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.DIRECTORES), controller.findById);
 
        return router
    }
}