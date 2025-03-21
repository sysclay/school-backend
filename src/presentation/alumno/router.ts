import { Router } from "express";
import { AlumnoController } from "./controller.js";
import { AlumnoDatasourceImpl, AlumnoRepositoryImpl } from "../../infraestructure/index.js";


export class AlumnoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AlumnoDatasourceImpl();
        const AlumnoRepository = new AlumnoRepositoryImpl(datasource);
        const controller = new AlumnoController(AlumnoRepository);

        router.post('/register',controller.registerAlumno);
        router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/searchall', controller.findAlumno);
        router.put('/updateqr/:id', controller.updateQR);

        return router
    }
}