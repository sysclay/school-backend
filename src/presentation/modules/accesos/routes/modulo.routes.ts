import { Router } from "express";
import { ModuloController } from "../controllers/modulo.controller.js";
import { ModuloDatasourceImpl, ModuloRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class ModuloRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ModuloDatasourceImpl();
        const moduloRepository = new ModuloRepositoryImpl(datasource);
        const controller = new ModuloController(moduloRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.MODULOS), controller.register);
        router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.MODULOS ),controller.findAllModulo);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.MODULOS), controller.updateAll);
        return router
    }
}