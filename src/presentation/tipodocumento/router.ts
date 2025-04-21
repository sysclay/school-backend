import { Router } from "express";
import { TipoDocumentoController } from "./controller.js";
import { TipoDocumentoDatasourceImpl, TipoDocumentoRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class TipoDocumentoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TipoDocumentoDatasourceImpl();
        const tipoDocumentoRepository = new TipoDocumentoRepositoryImpl(datasource);
        const controller = new TipoDocumentoController(tipoDocumentoRepository);

        router.post('register',authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerTipoDocumento);
        router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        router.get('/filter', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findTipoDocumento);

        return router
    }
}