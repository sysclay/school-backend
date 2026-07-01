import { Router } from "express";
import { ApoderadoAlumnoController } from "../controllers/apoderado.alumno.controller.js";
import { ApoderadoAlumnoDatasourceImpl, ApoderadoAlumnoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class ApoderadoAlumnoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ApoderadoAlumnoDatasourceImpl();
        const ApoderadoAlumnoooRepository = new ApoderadoAlumnoRepositoryImpl(datasource);
        const controller = new ApoderadoAlumnoController(ApoderadoAlumnoooRepository);

        router.post('/register',authMiddleware,authorizeRoles(Permissiones.CREATE, Modulos.APODERADOS_ALUMNO ), controller.register);

        router.get('/list-apoderado',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.APODERADOS_ALUMNO ),controller.findApoderado);
        router.get('/filter',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.APODERADOS_ALUMNO ),controller.filter);


        return router
    }
}