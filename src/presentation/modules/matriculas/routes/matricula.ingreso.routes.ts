import { Router } from "express";
// import { MatriculaIngresoController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { MatriculaIngresoDatasourceImpl, MatriculaIngresoRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { MatriculaIngresoController } from "../controllers/matricula.ingreso.controller.js";

export class MatriculaIngresoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new MatriculaIngresoDatasourceImpl();
        const MatriculaIngresoRepository = new MatriculaIngresoRepositoryImpl(datasource);
        const controller = new MatriculaIngresoController(MatriculaIngresoRepository);

        // router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.PERSONAS_ROLES), controller.register);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.MATRICULA_INGRESOS), controller.find);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.MATRICULA_INGRESOS), controller.findActive);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.MATRICULA_INGRESOS), controller.findById);

        return router
    }
}