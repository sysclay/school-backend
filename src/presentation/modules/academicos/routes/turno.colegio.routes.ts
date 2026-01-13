import { Router } from "express";
import { TurnoColegioController } from "../controllers/turno.colegio.controller.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Modulos } from '../../../../config/index.js';
import { TurnoColegioDatasourceImpl, TurnoColegioRepositoryImpl } from "../../../../infraestructure/index.js";


export class TurnoColegioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TurnoColegioDatasourceImpl();
        const TurnoColegioRepository = new TurnoColegioRepositoryImpl(datasource);
        const controller = new TurnoColegioController(TurnoColegioRepository);

        // router.get('/listar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PermisoS ),controller.findPermiso);
        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.TURNOS_COLEGIOS ),controller.register);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.TURNOS_COLEGIOS ),controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.TURNOS_COLEGIOS ),controller.findAllActive);
        router.get('/list-active/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.TURNOS_COLEGIOS ),controller.findById);
        router.get('/list-colegio', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.TURNOS_COLEGIOS ),controller.findColegio);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_OTHERS, Modulos.TURNOS_COLEGIOS ),controller.update);

        return router
    }
}