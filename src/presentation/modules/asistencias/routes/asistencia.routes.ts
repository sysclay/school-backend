import { Router } from "express";
// import { AsistenciaController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { AsistenciaDatasourceImpl, AsistenciaRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { AsistenciaController } from "../controllers/asistencia.controller.js";

export class AsistenciaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AsistenciaDatasourceImpl();
        const AsistenciaRepository = new AsistenciaRepositoryImpl(datasource);
        const controller = new AsistenciaController(AsistenciaRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.ASISTENCIA), controller.registerAsistencia);
        router.get('/filter-marcado', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA), controller.filterMatricula);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA), controller.filter);
        router.patch('/salida', authMiddleware, authorizeRoles(Permissiones.UPDATE_OWN, Modulos.ASISTENCIA), controller.update);

        router.get('/resumen-month', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA), controller.resumenMonth);
        router.get('/resumen-day', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA), controller.resumenDay);
        router.get('/resumen-alumno', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA), controller.resumenAlumno);

        return router
    }
}