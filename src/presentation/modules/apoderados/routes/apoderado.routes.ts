import { Router } from "express";
import { ApoderadoController } from "../controllers/apoderado.controller.js";
import { ApoderadoDatasourceImpl, ApoderadoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class ApoderadoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ApoderadoDatasourceImpl();
        const ApoderadoooRepository = new ApoderadoRepositoryImpl(datasource);
        const controller = new ApoderadoController(ApoderadoooRepository);

        router.post('/register',authMiddleware,authorizeRoles(Permissiones.CREATE, Modulos.APODERADOS ), controller.register);
        //router.get('/search/:id', authMiddleware, authorizeRolApoderadoes(RolApoderadoes.ADMIN, RolApoderadoes.AUXILIAR, RolApoderadoes.DOCENTE, RolApoderadoes.APODERADO), contRolApoderadoler.findById);
        // router.get('/filter', authMiddleware, authorizeRolApoderadoes(RolApoderadoes.ADMIN, RolApoderadoes.AUXILIAR, RolApoderadoes.DOCENTE, RolApoderadoes.APODERADO ), contRolApoderadoler.filterRolApoderado);


        router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.APODERADOS ),controller.find);
        router.get('/list-colegio',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.APODERADOS ),controller.findColegio);
        // router.get('/list/:id',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.APODERADOS ),controller.findById);

        router.get('/filter',authMiddleware, authorizeRoles(Permissiones.READ_OTHERS, Modulos.APODERADOS ), controller.filter);

        // router.get('/list_RolApoderadoes_apoderados', authMiddleware, authorizeRolApoderadoes(Permissiones.LIST_ALL, Modulos.TABLAS_RolApoderadoES_PERMISOS ), contRolApoderadoler.listRolApoderadoesApoderados);
        // router.post('/asignar_permiso_RolApoderado_modulo', authMiddleware, authorizeRolApoderadoes(Permissiones.CREATE, Modulos.TABLAS_RolApoderadoES_PERMISOS ), contRolApoderadoler.asignarRolApoderadoPermisoModulo);
        
        // router.get('/apoderado', authMiddleware, authorizeRolApoderadoes(Permissiones.LIST_ALL, Modulos.RolApoderadoES_APODERADO ), contRolApoderadoler.asigandoRolApoderado);

        // router.post('/register_RolApoderado_colegio', authMiddleware, authorizeRolApoderadoes(Permissiones.CREATE, Modulos.PERSONAS_RolApoderadoES_COLEGIOS ), contRolApoderadoler.registerPersonaRolApoderadoColegio);
        


        return router
    }
}