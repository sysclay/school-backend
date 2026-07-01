import { Router } from "express";
import { GeneroController } from "../controllers/genero.controller.js";
import { GeneroDatasourceImpl, GeneroRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Roles } from '../../../../config/index.js';
import { Permissiones } from '../../../../config/index.js';
import { Modulos } from '../../../../config/index.js';

export class GeneroRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new GeneroDatasourceImpl();
        const GeneroRepository = new GeneroRepositoryImpl(datasource);
        const controller = new GeneroController(GeneroRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.GENEROS), controller.registerGenero);
        // router.get('/perfil', authMiddleware, authorizeRoles(Permissiones.READ_OWN, Modulos.GENEROS), controller.findGeneroById);
        // router.get('/colegio/:id', authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.GENEROS), controller.findGeneroByNDoc);
        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.GENEROS), controller.findGenero);
        // router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findById);
        // router.get('/filter',  authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.filterGenero);
        // router.get('/searchall', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.APODERADO, Roles.AUXILIAR, Roles.DOCENTE), controller.findGenero);
        // router.put('/updateqr/:id', authMiddleware, authorizeRoles(Roles.ADMIN), controller.updateQR);

        return router
    }
}