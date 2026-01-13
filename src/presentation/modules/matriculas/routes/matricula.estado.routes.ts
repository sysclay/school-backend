import { Router } from "express";
// import { MatriculaEstadoController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { MatriculaEstadoDatasourceImpl, MatriculaEstadoRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { MatriculaEstadoController } from "../controllers/matricula.estado.controller.js";

export class MatriculaEstadoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new MatriculaEstadoDatasourceImpl();
        const MatriculaEstadoRepository = new MatriculaEstadoRepositoryImpl(datasource);
        const controller = new MatriculaEstadoController(MatriculaEstadoRepository);

        // router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.PERSONAS_ROLES), controller.register);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.MATRICULA_ESTADOS), controller.find);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.MATRICULA_ESTADOS), controller.findActive);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.MATRICULA_ESTADOS), controller.findById);

        return router
    }
}