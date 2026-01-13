import { Router } from "express";
import { TurnoController } from "../controllers/turno.controller.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Modulos } from '../../../../config/index.js';
import { TurnoDatasourceImpl, TurnoRepositoryImpl } from "../../../../infraestructure/index.js";


export class TurnoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TurnoDatasourceImpl();
        const TurnoRepository = new TurnoRepositoryImpl(datasource);
        const controller = new TurnoController(TurnoRepository);

        // router.get('/listar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PermisoS ),controller.findPermiso);
        // router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PERMISOS ),controller.registerPermiso);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.TURNOS ),controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.TURNOS ),controller.findAllActive);
        router.get('/list-active/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.TURNOS ),controller.findById);
        // router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERMISOS ),controller.updatePermiso);

        return router
    }
}