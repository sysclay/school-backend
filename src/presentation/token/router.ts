import { Router } from "express";
import { TokenController } from "./controller.js";
import { TokenDatasourceImpl, TokenRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class TokenRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TokenDatasourceImpl();
        const tokenooRepository = new TokenRepositoryImpl(datasource);
        const controller = new TokenController(tokenooRepository);

        // router.post('/validar', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.validarToken);
        router.post('/validar', controller.validarToken);

        return router
    }
}