import { Router } from "express";
import { PermisoController } from "../controllers/permiso.controller.js";
import { PermisoDatasourceImpl, PermisoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';


export class PermisoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PermisoDatasourceImpl();
        const PermisoRepository = new PermisoRepositoryImpl(datasource);
        const controller = new PermisoController(PermisoRepository);

        // router.get('/listar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PermisoS ),controller.findPermiso);
        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PERMISOS ),controller.registerPermiso);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.PERMISOS ),controller.findAllPermiso);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERMISOS ),controller.updatePermiso);

        return router
    }
}