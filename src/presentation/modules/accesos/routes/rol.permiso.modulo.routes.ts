import { Router } from "express";
import { RolPermisoModuloController } from "../controllers/rol.permiso.modulo.controller.js";
import { RolPermisoModuloDatasourceImpl, RolPermisoModuloRepositoryImpl } from "../../../../infraestructure/index.js";

import { authorizeRoles } from "../../../middlewares/AuthorizeRoles.js";
import { authMiddleware } from "../../../middlewares/AuthMiddleware.js";
import { Permissiones, Roles, Modulos } from '../../../../config/index.js';

export class RolPermisoModuloRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new RolPermisoModuloDatasourceImpl();
        const rolPermisoModuloRepository = new RolPermisoModuloRepositoryImpl(datasource);
        const controller = new RolPermisoModuloController(rolPermisoModuloRepository);

        // router.post('/register', authMiddleware, authorizeRoles(Roles.ADMIN ), controller.registerRol);
        //router.get('/search/:id', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO), controller.findById);
        // router.get('/filter', authMiddleware, authorizeRoles(Roles.ADMIN, Roles.AUXILIAR, Roles.DOCENTE, Roles.APODERADO ), controller.filterRol);


        // router.get('/list',authMiddleware,authorizeRoles(Permissiones.LIST_ALL, Modulos.ROLES ),controller.findAllRol);

        router.get('/list', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.CONTROL_SEGURIDAD), controller.findAll);
        router.post('/register', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.CONTROL_SEGURIDAD ), controller.register);
        
        // router.get('/asignado', authMiddleware, authorizeRoles(Permissiones.LIST_ALL, Modulos.ROLES_ASIGNADO ), controller.asigandoRol);

        // router.post('/register_rol_colegio', authMiddleware, authorizeRoles(Permissiones.CREATE, Modulos.PERSONAS_ROLES_COLEGIOS ), controller.registerPersonaRolColegio);
        


        return router
    }
}