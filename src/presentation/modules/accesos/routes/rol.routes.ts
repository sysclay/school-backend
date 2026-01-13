import { Router } from "express";
import { RolController } from "../controllers/rol.controller.js";
import { RolDatasourceImpl, RolRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class RolRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new RolDatasourceImpl();
        const rolooRepository = new RolRepositoryImpl(datasource);
        const controller = new RolController(rolooRepository);

        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.ROLES ), controller.register);
        //router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        // router.get('/filter', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO ), controller.filterRol);


        router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.ROLES ),controller.findAll);

        // router.get('/list_roles_asignados', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.TABLAS_ROLES_PERMISOS ), controller.listRolesAsignados);
        // router.post('/asignar_permiso_rol_modulo', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.TABLAS_ROLES_PERMISOS ), controller.asignarRolPermisoModulo);
        
        // router.get('/asignado', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.ROLES_ASIGNADO ), controller.asigandoRol);

        // router.post('/register_rol_colegio', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PERSONAS_ROLES_COLEGIOS ), controller.registerPersonaRolColegio);
        


        return router
    }
}