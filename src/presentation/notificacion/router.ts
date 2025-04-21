import { Router } from "express";
import { NotificacionController } from "./controller.js";
import { NotificacionDatasourceImpl, NotificacionRepositoryImpl } from "../../infraestructure/index.js";
// import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infraestructure/index.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class NotificacionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new NotificacionDatasourceImpl();
        const notificacionRepository = new NotificacionRepositoryImpl(datasource);
        const controller = new NotificacionController(notificacionRepository);

        // const notificacionController = new NotificacionController();
        
        router.post('/enviar', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE), controller.enviarNotificacion);
        router.post('/fcm-alumno-apoderado', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE), controller.obtenerFcmApoderadoAlumno);

        return router
    }
}