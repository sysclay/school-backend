import { Router } from "express";
import { ColegioController } from "../../colegios/controllers/colegio.controller.js";

import { ColegioDatasourceImpl, ColegioRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class ColegioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ColegioDatasourceImpl();
        const ColegioRepository = new ColegioRepositoryImpl(datasource);
        const controller = new ColegioController(ColegioRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.COLEGIOS), controller.registerColegio);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS), controller.findById);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.COLEGIOS), controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS), controller.findAllActive);
        router.get('/list-one', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.COLEGIOS), controller.findOne);
        router.put('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.COLEGIOS), controller.updateAll);
        
        return router
    }
}