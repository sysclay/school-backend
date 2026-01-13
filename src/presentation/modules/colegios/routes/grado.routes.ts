import { Router } from "express";
import { GradoController } from "../controllers/grado.controller.js";
import { GradoDatasourceImpl, GradoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class GradoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new GradoDatasourceImpl();
        const GradoooRepository = new GradoRepositoryImpl(datasource);
        const controller = new GradoController(GradoooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.GRADOS  ), controller.register);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.GRADOS ), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.GRADOS ), controller.find);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.GRADOS ),controller.updateAll);
        return router
    }
}