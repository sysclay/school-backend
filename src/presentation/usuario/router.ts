import { Router } from "express";
import { UsuarioController } from "./controller.js";
import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class UsuarioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UsuarioDatasourceImpl();
        const usuarioooRepository = new UsuarioRepositoryImpl(datasource);
        const controller = new UsuarioController(usuarioooRepository);

        // router.post('/register',authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerUsuario);
        router.post('/register', controller.registerUsuario);
        router.post('/login',controller.loginUsuario);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN ), controller.findUsuario);
        router.put('/update/:id', controller.updateUsuario);

        return router
    }
}