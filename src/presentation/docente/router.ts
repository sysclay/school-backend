import { Router } from "express";
import { DocenteController } from "./controller.js";
import { DocenteDatasourceImpl, DocenteRepositoryImpl } from "../../infraestructure/index.js";


export class DocenteRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new DocenteDatasourceImpl();
        const docenteRepository = new DocenteRepositoryImpl(datasource);
        const controller = new DocenteController(docenteRepository);

        router.post('/register',controller.registerDocente);
        router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findDocente);

        return router
    }
}