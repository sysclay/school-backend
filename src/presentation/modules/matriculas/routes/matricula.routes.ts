import { Router } from "express";
// import { MatriculaIngresoController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { MatriculaDatasourceImpl, MatriculaRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { MatriculaController } from "../controllers/matricula.controller.js";

export class MatriculaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new MatriculaDatasourceImpl();
        const matriculaRepository = new MatriculaRepositoryImpl(datasource);
        const controller = new MatriculaController(matriculaRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.MATRICULAS), controller.register);
        // router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.MATRICULAS), controller.find);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.MATRICULAS), controller.filter);

        return router
    }
}