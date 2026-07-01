import { Router } from "express";
import { FcmController } from "../../usuarios/controllers/fcm.controller.js";
import { FcmDatasourceImpl, FcmRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';


export class FcmRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new FcmDatasourceImpl();
        const fcmooRepository = new FcmRepositoryImpl(datasource);
        const controller = new FcmController(fcmooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.FCM), controller.register);
        router.get('/read', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.FCM), controller.findById);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.FCM), controller.find);
        router.get('/filter', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.FCM), controller.filter);
        // router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.FCMS), controller.update);
        router.put('/update-one', authMiddleware, authorizeRoles(Permissiones.UPDATE_OWN, Modulos.FCM), controller.updateOne);
        router.put('/update-active', authMiddleware, authorizeRoles(Permissiones.UPDATE_OWN, Modulos.FCM), controller.updateActive);

        return router
    }
}