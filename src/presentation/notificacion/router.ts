import { Router } from "express";
import { NotificacionController } from "./controller.js";
import { NotificacionDatasourceImpl, NotificacionRepositoryImpl } from "../../infraestructure/index.js";
// import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infraestructure/index.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";


export class NotificacionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new NotificacionDatasourceImpl();
        const notificacionRepository = new NotificacionRepositoryImpl(datasource);
        const controller = new NotificacionController(notificacionRepository);

        // const notificacionController = new NotificacionController();
        
        router.post('/enviar',controller.enviarNotificacion);

        return router
    }
}