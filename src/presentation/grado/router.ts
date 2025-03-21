import { Router } from "express";
import { GradoController } from "./controller.js";
import { GradoDatasourceImpl, GradoRepositoryImpl } from "../../infraestructure/index.js";


export class GradoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new GradoDatasourceImpl();
        const GradoooRepository = new GradoRepositoryImpl(datasource);
        const controller = new GradoController(GradoooRepository);

        router.post('/register',controller.registerGrado);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findGrado);

        return router
    }
}