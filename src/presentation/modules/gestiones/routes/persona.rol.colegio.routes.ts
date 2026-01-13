import { Router } from "express";
// import { PersonaRolColegioController } from "../../colegio/controllers/colegio.nivel.controller.js";

import { PersonaRolColegioDatasourceImpl, PersonaRolColegioRepositoryImpl } from "../../../../infraestructure/index.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";

import { Permissiones, Roles, Modulos } from '../../../../config/index.js';
import { PersonaRolColegioController } from "../controllers/persona.rol.colegio.controller.js";

export class PersonaRolColegioRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PersonaRolColegioDatasourceImpl();
        const PersonaRolColegioRepository = new PersonaRolColegioRepositoryImpl(datasource);
        const controller = new PersonaRolColegioController(PersonaRolColegioRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE,Modulos.PERSONAS_ROLES_COLEGIOS), controller.register);
        //router.get('/search/:id', controller.findById);
        //router.get('/filter', controller.findByNameCorto);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.PERSONAS_ROLES_COLEGIOS), controller.find);
        router.put('/update', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERSONAS_ROLES_COLEGIOS),controller.updateAll)

        return router
    }
}