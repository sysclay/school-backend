import { Router } from "express";
// import { ColegioNiveloController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { ColegioNivelDatasourceImpl, ColegioNivelRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { ColegioNivelController } from "../controllers/colegio.nivel.controller.js";

export class ColegioNiveloRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ColegioNivelDatasourceImpl();
        const colegioNiveloRepository = new ColegioNivelRepositoryImpl(datasource);
        const controller = new ColegioNivelController(colegioNiveloRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.COLEGIOS_NIVELES), controller.register);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_NIVELES), controller.findById);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.COLEGIOS_NIVELES), controller.find);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_NIVELES), controller.filter);
        router.patch('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.COLEGIOS_NIVELES), controller.updateIsActive);
        

        return router
    }
}