import { Router } from "express";
import { FcmController } from "./controller.js";
import { FcmDatasourceImpl, FcmRepositoryImpl } from "../../infraestructure/index.js";


export class FcmRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new FcmDatasourceImpl();
        const fcmRepository = new FcmRepositoryImpl(datasource);
        const controller = new FcmController(fcmRepository);

        router.post('/register',controller.registerFcm);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findFcm);

        return router
    }
}