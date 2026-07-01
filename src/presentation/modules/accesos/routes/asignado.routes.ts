import { Router } from "express";
import { AsignadoController } from "../controllers/asignado.controller.js";
import { AsignadoDatasourceImpl, AsignadoRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class AsignadoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AsignadoDatasourceImpl();
        const AsignadoooRepository = new AsignadoRepositoryImpl(datasource);
        const controller = new AsignadoController(AsignadoooRepository);

        router.post('/register',authMiddleware,authorizeRoles(Permissiones.CREATE, Modulos.ROLES_ASIGNADO ), controller.register);
        //router.get('/search/:id', authMiddleware, authorizeRolAsignadoes(RolAsignadoes.ADMIN, RolAsignadoes.AUXILIAR, RolAsignadoes.DOCENTE, RolAsignadoes.APODERADO), contRolAsignadoler.findById);
        // router.get('/filter', authMiddleware, authorizeRolAsignadoes(RolAsignadoes.ADMIN, RolAsignadoes.AUXILIAR, RolAsignadoes.DOCENTE, RolAsignadoes.APODERADO ), contRolAsignadoler.filterRolAsignado);


        router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.ROLES_ASIGNADO ),controller.findAll);
        router.get('/id',authMiddleware,authorizeRoles(Permissiones.READ_OTHERS, Modulos.ROLES_ASIGNADO ),controller.findById);

        // router.get('/list_RolAsignadoes_asignados', authMiddleware, authorizeRolAsignadoes(Permissiones.LIST_ALL, Modulos.TABLAS_RolAsignadoES_PERMISOS ), contRolAsignadoler.listRolAsignadoesAsignados);
        // router.post('/asignar_permiso_RolAsignado_modulo', authMiddleware, authorizeRolAsignadoes(Permissiones.CREATE, Modulos.TABLAS_RolAsignadoES_PERMISOS ), contRolAsignadoler.asignarRolAsignadoPermisoModulo);
        
        // router.get('/asignado', authMiddleware, authorizeRolAsignadoes(Permissiones.LIST_ALL, Modulos.RolAsignadoES_ASIGNADO ), contRolAsignadoler.asigandoRolAsignado);

        // router.post('/register_RolAsignado_colegio', authMiddleware, authorizeRolAsignadoes(Permissiones.CREATE, Modulos.PERSONAS_RolAsignadoES_COLEGIOS ), contRolAsignadoler.registerPersonaRolAsignadoColegio);
        


        return router
    }
}