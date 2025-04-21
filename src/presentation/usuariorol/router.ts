import { Router } from "express";
import { UsuariorolController } from "./controller.js";
import { UsuariorolDatasourceImpl, UsuariorolRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class UsuariorolRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UsuariorolDatasourceImpl();
        const usuariorolooRepository = new UsuariorolRepositoryImpl(datasource);
        const controller = new UsuariorolController(usuariorolooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerUsuariorol);
        //router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        router.get('/filter', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO ), controller.filterUsuariorol);
        router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN ), controller.findUsuariorol);

        return router
    }
}