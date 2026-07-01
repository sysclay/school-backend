import { Router } from "express";
import { AcademicoColegioController } from "../controllers/academico.colegio.controller.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { AcademicoColegioDatasourceImpl, AcademicoColegioRepositoryImpl } from "../../../../infraestructure/index.js";


export class AcademicoColegioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AcademicoColegioDatasourceImpl();
        const AcademicoColegioRepository = new AcademicoColegioRepositoryImpl(datasource);
        const controller = new AcademicoColegioController(AcademicoColegioRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.ACADEMICOS_COLEGIOS ),controller.register);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.ACADEMICOS_COLEGIOS ),controller.findAll);
        router.get('/list-active', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ACADEMICOS_COLEGIOS ),controller.findAllActive);
        router.get('/list-active/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ACADEMICOS_COLEGIOS ),controller.findById);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.ACADEMICOS_COLEGIOS ),controller.filter);
        // router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERMISOS ),controller.updatePermiso);

        return router
    }
}