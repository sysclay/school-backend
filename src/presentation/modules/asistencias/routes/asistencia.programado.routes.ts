import { Router } from "express";
// import { AsistenciaProgramadoController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { AsistenciaProgramadoDatasourceImpl, AsistenciaProgramadoRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { AsistenciaProgramadoController } from "../controllers/asistencia.programado.controller.js";

export class AsistenciaProgramadoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AsistenciaProgramadoDatasourceImpl();
        const AsistenciaProgramadoRepository = new AsistenciaProgramadoRepositoryImpl(datasource);
        const controller = new AsistenciaProgramadoController(AsistenciaProgramadoRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.ASISTENCIA_PROGRAMADO), controller.registerAsistenciaProgramado);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        // router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.COLEGIOS_GRADOS), controller.findByIdColegio);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.ASISTENCIA_PROGRAMADO), controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA_PROGRAMADO), controller.findAllActive);
        router.get('/list-filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ASISTENCIA_PROGRAMADO), controller.findAllFilter);
        // router.patch('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.COLEGIOS_GRADOS), controller.updateIsActive);

        return router
    }
}