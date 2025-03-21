import { Router } from "express";
import { NotificacionController } from "./controller.js";
// import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infraestructure/index.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";


export class NotificacionRoutes {
    static get routes(): Router {
        const router = Router();
        const notificacionController = new NotificacionController();
        
        router.post('/register',notificacionController.enviarNotificacion);

        return router
    }
}