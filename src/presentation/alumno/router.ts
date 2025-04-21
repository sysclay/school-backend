import { Router } from "express";
import { AlumnoController } from "./controller.js";
import { AlumnoDatasourceImpl, AlumnoRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class AlumnoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AlumnoDatasourceImpl();
        const AlumnoRepository = new AlumnoRepositoryImpl(datasource);
        const controller = new AlumnoController(AlumnoRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN), controller.registerAlumno);
        router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findById);
        router.get('/filter',  authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.filterAlumno);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findAlumno);
        router.put('/updateqr/:id', authMiddleware, authorizeRoles(Roles.ADMIN), controller.updateQR);

        return router
    }
}