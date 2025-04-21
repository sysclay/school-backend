import { Router } from "express";
import { MatriculaController } from "./controller.js";
import { MatriculaDatasourceImpl, MatriculaRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class MatriculaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new MatriculaDatasourceImpl();
        const matriculaRepository = new MatriculaRepositoryImpl(datasource);
        const controller = new MatriculaController(matriculaRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerMatricula);
        router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findMatricula);
        router.get('/filter-matricula-grado-seccion', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.filterMatriculaGradoSeccion)

        return router
    }
}