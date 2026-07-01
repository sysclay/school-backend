import { Router } from "express";
import { TipoDocumentoController } from "../controllers/tipo.documento.controller.js";
import { TipoDocumentoDatasourceImpl, TipoDocumentoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class TipoDocumentoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TipoDocumentoDatasourceImpl();
        const tipoDocumentoRepository = new TipoDocumentoRepositoryImpl(datasource);
        const controller = new TipoDocumentoController(tipoDocumentoRepository);

        // router.post('register',authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerTipoDocumento);
        // router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        // router.get('/filter', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findByNameCorto);
        router.get('/listar', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.TIPOS_DUCUMENTOS), controller.findTipoDocumento);

        return router
    }
}