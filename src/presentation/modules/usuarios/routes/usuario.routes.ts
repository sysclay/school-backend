import { Router } from "express";
import { UsuarioController } from "../../usuarios/controllers/usuario.controller.js";
import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';


export class UsuarioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UsuarioDatasourceImpl();
        const usuarioooRepository = new UsuarioRepositoryImpl(datasource);
        const controller = new UsuarioController(usuarioooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.USUARIOS), controller.register);
        router.get('/read', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.USUARIOS), controller.findById);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.USUARIOS), controller.find);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.USUARIOS), controller.update);
        router.put('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_OWN, Modulos.USUARIOS), controller.updateOne);
        // router.put('/update', controller.updateOne);

        return router
    }
}