import { Router } from "express";
import { ColegioController } from "./controller.js";
import { ColegioDatasourceImpl, ColegioRepositoryImpl } from "../../infraestructure/index.js";


export class ColegioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ColegioDatasourceImpl();
        const ColegioRepository = new ColegioRepositoryImpl(datasource);
        const controller = new ColegioController(ColegioRepository);

        router.post('/register',controller.registerColegio);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findColegio);

        return router
    }
}