import { Router } from "express";
import { UsuarioController } from "./controller.js";
import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infraestructure/index.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";


export class UsuarioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UsuarioDatasourceImpl();
        const usuarioooRepository = new UsuarioRepositoryImpl(datasource);
        const controller = new UsuarioController(usuarioooRepository);

        router.post('/register',authMiddleware, controller.registerUsuario);
        router.post('/login',controller.loginUsuario);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall',authMiddleware, controller.findUsuario);

        return router
    }
}