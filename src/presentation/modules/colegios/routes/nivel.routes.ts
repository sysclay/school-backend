import { Router } from "express";
import { NivelController } from "../controllers/nivel.controller.js";
import { NivelDatasourceImpl, NivelRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones } from "../../../../config/segurity.permisiones.js";
import { Modulos } from "../../../../config/segurity.modulos.js";
// import { Roles } from '../../../../config/index.js';

export class NivelRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new NivelDatasourceImpl();
        const NivelooRepository = new NivelRepositoryImpl(datasource);
        const controller = new NivelController(NivelooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.NIVELES ), controller.register);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.NIVELES ), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.NIVELES ), controller.find);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.NIVELES ), controller.findActive);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.NIVELES ),controller.updateAll);

        return router
    }
}