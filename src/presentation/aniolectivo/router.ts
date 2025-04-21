import { Router } from "express";
import { AniolectivoController } from "./controller.js";
import { AniolectivoDatasourceImpl, AniolectivoRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class AniolectivoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AniolectivoDatasourceImpl();
        const AniolectivooRepository = new AniolectivoRepositoryImpl(datasource);
        const controller = new AniolectivoController(AniolectivooRepository);

        router.post('/register',authMiddleware, authorizeRoles(Roles.ADMIN), controller.registerAniolectivo);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall',authMiddleware, authorizeRoles(Roles.ADMIN),  controller.findAniolectivo);

        return router
    }
}