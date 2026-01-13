import { Router } from "express";
import { AcademicoController } from "../controllers/academico.controller.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Modulos } from '../../../../config/index.js';
import { AcademicoDatasourceImpl, AcademicoRepositoryImpl } from "../../../../infraestructure/index.js";


export class AcademicoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AcademicoDatasourceImpl();
        const AcademicoRepository = new AcademicoRepositoryImpl(datasource);
        const controller = new AcademicoController(AcademicoRepository);

        // router.get('/listar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PermisoS ),controller.findPermiso);
        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.ACADEMICOS ),controller.register);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.ACADEMICOS ),controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ACADEMICOS ),controller.findAllActive);
        router.get('/list-active-actual', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.ACADEMICOS ),controller.findAllActiveActual);
        // router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERMISOS ),controller.updatePermiso);

        return router
    }
}