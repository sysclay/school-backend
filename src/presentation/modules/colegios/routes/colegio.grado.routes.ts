import { Router } from "express";
// import { ColegioGradoController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { ColegioGradoDatasourceImpl, ColegioGradoRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { ColegioGradoController } from "../controllers/colegio.grado.controller.js";

export class ColegioGradoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ColegioGradoDatasourceImpl();
        const ColegioGradoRepository = new ColegioGradoRepositoryImpl(datasource);
        const controller = new ColegioGradoController(ColegioGradoRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.COLEGIOS_GRADOS), controller.registerColegioGrado);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_GRADOS), controller.findByIdColegio);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.COLEGIOS_GRADOS), controller.findColegioGrado);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_GRADOS), controller.filter);
        router.patch('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.COLEGIOS_GRADOS), controller.updateIsActive);

        return router
    }
}