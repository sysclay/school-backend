import { Router } from "express";
import { MatriculaController } from "./controller.js";
import { MatriculaDatasourceImpl, MatriculaRepositoryImpl } from "../../infraestructure/index.js";


export class MatriculaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new MatriculaDatasourceImpl();
        const matriculaRepository = new MatriculaRepositoryImpl(datasource);
        const controller = new MatriculaController(matriculaRepository);

        router.post('/register',controller.registerMatricula);
        router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findMatricula);

        return router
    }
}