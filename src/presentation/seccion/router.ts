import { Router } from "express";
import { SeccionController } from "./controller.js";
import { SeccionDatasourceImpl, SeccionRepositoryImpl } from "../../infraestructure/index.js";


export class SeccionRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new SeccionDatasourceImpl();
        const seccionooRepository = new SeccionRepositoryImpl(datasource);
        const controller = new SeccionController(seccionooRepository);

        router.post('/register',controller.registerSeccion);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findSeccion);

        return router
    }
}