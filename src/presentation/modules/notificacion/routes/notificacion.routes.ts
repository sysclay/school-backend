import { Router } from "express";
// import { NotificacionController } from "./controller.js";
// import { NotificacionDatasourceImpl, NotificacionRepositoryImpl } from "../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones } from "../../../../config/segurity.permisiones.js";
import { Modulos } from "../../../../config/segurity.Modulos.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { NotificacionDatasourceImpl, NotificacionRepositoryImpl } from "../../../../infraestructure/index.js";
import { NotificacionController } from "../controllers/notificacion.controller.js";
// import { NotificacionController } from "../controller.ts/notificacion.controllers.js";
// import { NotificacionController } from "../controller.ts/controller.js";
// import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infraestructure/index.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";

// import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";
// import { Roles } from '../../config/index.js';

export class NotificacionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new NotificacionDatasourceImpl();
        const notificacionRepository = new NotificacionRepositoryImpl(datasource);
        const controller = new NotificacionController(notificacionRepository);

        // const notificacionController = new NotificacionController();
        
        router.post('/enviar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.NOTIFICATION), controller.enviarNotificacion);
        // router.post('/fcm-alumno-apoderado', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.MATRICULAS), controller.obtenerFcmApoderadoAlumno);

        return router
    }
}