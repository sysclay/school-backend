import { Router } from "express";
import { TipoDocumentoController } from "./controller.js";
import { TipoDocumentoDatasourceImpl, TipoDocumentoRepositoryImpl } from "../../infraestructure/index.js";


export class TipoDocumentoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new TipoDocumentoDatasourceImpl();
        const tipoDocumentoRepository = new TipoDocumentoRepositoryImpl(datasource);
        const controller = new TipoDocumentoController(tipoDocumentoRepository);

        router.post('register',controller.registerTipoDocumento);
        router.get('/search/:id', controller.findById);
        router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findTipoDocumento);

        return router
    }
}