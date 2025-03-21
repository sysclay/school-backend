import { Router } from "express";
import { UsuariorolController } from "./controller.js";
import { UsuariorolDatasourceImpl, UsuariorolRepositoryImpl } from "../../infraestructure/index.js";


export class UsuariorolRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UsuariorolDatasourceImpl();
        const usuariorolooRepository = new UsuariorolRepositoryImpl(datasource);
        const controller = new UsuariorolController(usuariorolooRepository);

        router.post('/register',controller.registerUsuariorol);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findUsuariorol);

        return router
    }
}