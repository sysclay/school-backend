import { Router } from "express";
import { LoginController } from "../../usuarios/controllers/login.controller.js";
import { LoginDatasourceImpl, LoginRepositoryImpl } from "../../../../infraestructure/index.js";

// import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
// import { Roles } from '../../../../config/index.js';

export class LoginRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new LoginDatasourceImpl();
        const usuarioooRepository = new LoginRepositoryImpl(datasource);
        const controller = new LoginController(usuarioooRepository);

        // router.post('/register',authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerUsuario);

        router.post('/login',controller.loginUsuario);
        // router.post('/check', controller.checkRol);
        router.post('/check', authMiddleware, controller.checkRol);
        router.post('/validartoken', authMiddleware, controller.validarToken);

        return router
    }
}