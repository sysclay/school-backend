import { Router } from "express";
import { ApoderadoController } from "./controller.js";
import { ApoderadoDatasourceImpl, ApoderadoRepositoryImpl } from "../../infraestructure/index.js";


export class ApoderadoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ApoderadoDatasourceImpl();
        const apoderadoRepository = new ApoderadoRepositoryImpl(datasource);
        const controller = new ApoderadoController(apoderadoRepository);

        router.post('/register',controller.registerApoderado);
        router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findApoderado);

        return router
    }
}