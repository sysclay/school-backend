import { Router } from "express";
// import { AlumnoController } from "./controller.js";
// import { AlumnoDatasourceImpl, AlumnoRepositoryImpl } from "../../infraestructure/index.js";

// import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
// import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { AlumnoDatasourceImpl, AlumnoRepositoryImpl } from "../../../../infraestructure/index.js";
import { AlumnoController } from "../controllers/alumno.controller.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

export class AlumnoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AlumnoDatasourceImpl();
        const AlumnoRepository = new AlumnoRepositoryImpl(datasource);
        const controller = new AlumnoController(AlumnoRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.ALUMNOS), controller.register);
        router.get('/filter',  authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ALUMNOS), controller.filter);
        router.get('/filter/:id', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.ALUMNOS), controller.findById);

        // router.get('/listar', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.ALUMNOS ),controller.findAlumno);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.ALUMNOS ),controller.find);
        router.get('/list-colegio', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.ALUMNOS ),controller.findColegio);

        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.ALUMNOS ), controller.updateAll);


        return router
    }
}