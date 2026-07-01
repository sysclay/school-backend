import { Router } from "express";
import { PersonaController } from "../controllers/persona.controller.js";
import { PersonaDatasourceImpl, PersonaRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Roles } from '../../../../config/index.js';
import { Permissiones } from '../../../../config/index.js';
import { Modulos } from '../../../../config/index.js';

export class PersonaRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PersonaDatasourceImpl();
        const PersonaRepository = new PersonaRepositoryImpl(datasource);
        const controller = new PersonaController(PersonaRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PERSONAS), controller.registerPersona);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.PERSONAS), controller.findPersona);
        router.get('/list/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.PERSONAS), controller.findById);
        router.get('/filter',  authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.PERSONAS), controller.filterPersona);

        router.get('/perfil', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.PERSONAS), controller.findPersonaById);
        router.get('/colegio/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.PERSONAS), controller.findPersonaByNDoc);



        // router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findById);
        // router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findPersona);
        router.put('/update/:id', authMiddleware, authorizeRoles(Permissiones.UPDATE_ALL, Modulos.PERSONAS), controller.updateById);
 
        return router
    }
}