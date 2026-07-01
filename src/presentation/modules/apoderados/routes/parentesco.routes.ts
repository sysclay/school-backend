import { Router } from "express";
import { ParentescoController } from "../controllers/parentesco.controller.js";
import { ParentescoDatasourceImpl, ParentescoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class ParentescoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ParentescoDatasourceImpl();
        const ParentescoooRepository = new ParentescoRepositoryImpl(datasource);
        const controller = new ParentescoController(ParentescoooRepository);

        router.post('/register',authMiddleware,authorizeRoles(Permissiones.CREATE, Modulos.PARENTESCOS ), controller.register);

        router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.PARENTESCOS ),controller.find);
        router.get('/list-active',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.PARENTESCOS ),controller.findActive);

        return router
    }
}