import { Router } from "express";
import { GrupoController } from "../controllers/grupo.controller.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Modulos } from '../../../../config/index.js';
import { GrupoDatasourceImpl, GrupoRepositoryImpl } from "../../../../infraestructure/index.js";


export class GrupoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new GrupoDatasourceImpl();
        const GrupoRepository = new GrupoRepositoryImpl(datasource);
        const controller = new GrupoController(GrupoRepository);

        // router.get('/listar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PermisoS ),controller.findPermiso);
        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.GRUPOS_ACADEMICOS ),controller.register);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.GRUPOS_ACADEMICOS ),controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.GRUPOS_ACADEMICOS ),controller.findAllActive);
        router.get('/list-active/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.GRUPOS_ACADEMICOS ),controller.findById);
        // router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERMISOS ),controller.updatePermiso);

        return router
    }
}