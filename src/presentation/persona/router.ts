import { Router } from "express";
import { PersonaController } from "./controller.js";
import { PersonaDatasourceImpl, PersonaRepositoryImpl } from "../../infraestructure/index.js";

import { authorizeRoles } from "../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { Roles } from '../../config/index.js';

export class PersonaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PersonaDatasourceImpl();
        const PersonaRepository = new PersonaRepositoryImpl(datasource);
        const controller = new PersonaController(PersonaRepository);

        router.post('/register', controller.registerPersona);
        // router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findById);
        // router.get('/filter',  authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.filterPersona);
        // router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findPersona);
        // router.put('/updateqr/:id', authMiddleware, authorizeRoles(Roles.ADMIN), controller.updateQR);

        return router
    }
}