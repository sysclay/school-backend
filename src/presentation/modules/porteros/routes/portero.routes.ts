import { Router } from "express";
import { PorteroController } from "../controllers/portero.controller.js";
import { PorteroDatasourceImpl, PorteroRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class PorteroRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PorteroDatasourceImpl();
        const PorteroooRepository = new PorteroRepositoryImpl(datasource);
        const controller = new PorteroController(PorteroooRepository);

        router.post('/register',authMiddleware,authorizeRoles(Permissiones.CREATE, Modulos.PORTEROS ), controller.register);
        //router.get('/search/:id', authMiddleware, authorizeRolPorteroes(RolPorteroes.ADMIN, RolPorteroes.AUXILIAR, RolPorteroes.DOCENTE, RolPorteroes.PORTERO), contRolPorteroler.findById);
        // router.get('/filter', authMiddleware, authorizeRolPorteroes(RolPorteroes.ADMIN, RolPorteroes.AUXILIAR, RolPorteroes.DOCENTE, RolPorteroes.PORTERO ), contRolPorteroler.filterRolPortero);


        router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.PORTEROS ),controller.find);
        router.get('/list-colegio',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.PORTEROS ),controller.findColegio);
        // router.get('/list/:id',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.PORTEROS ),controller.findById);

        router.get('/filter',authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.PORTEROS ), controller.filter);

        // router.get('/list_RolPorteroes_porteros', authMiddleware, authorizeRolPorteroes(Permissiones.LIST_ALL, Modulos.TABLAS_RolPorteroES_PERMISOS ), contRolPorteroler.listRolPorteroesPorteros);
        // router.post('/asignar_permiso_RolPortero_modulo', authMiddleware, authorizeRolPorteroes(Permissiones.CREATE, Modulos.TABLAS_RolPorteroES_PERMISOS ), contRolPorteroler.asignarRolPorteroPermisoModulo);
        
        // router.get('/portero', authMiddleware, authorizeRolPorteroes(Permissiones.LIST_ALL, Modulos.RolPorteroES_PORTERO ), contRolPorteroler.asigandoRolPortero);

        // router.post('/register_RolPortero_colegio', authMiddleware, authorizeRolPorteroes(Permissiones.CREATE, Modulos.PERSONAS_RolPorteroES_COLEGIOS ), contRolPorteroler.registerPersonaRolPorteroColegio);
        


        return router
    }
}