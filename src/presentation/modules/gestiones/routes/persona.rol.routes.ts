import { Router } from "express";
// import { PersonaRolController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { PersonaRolDatasourceImpl, PersonaRolRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { PersonaRolController } from "../controllers/persona.rol.controller.js";

export class PersonaRolRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PersonaRolDatasourceImpl();
        const PersonaRolRepository = new PersonaRolRepositoryImpl(datasource);
        const controller = new PersonaRolController(PersonaRolRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.PERSONAS_ROLES), controller.register);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.PERSONAS_ROLES), controller.find);

        return router
    }
}