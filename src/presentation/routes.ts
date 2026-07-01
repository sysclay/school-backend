import { Router } from "express";

import { ColegioRoutes, UsuarioRoutes, LoginRoutes, PersonaRoutes, TipoDocumentoRoutes, RolRoutes, ModuloRoutes, PermisoRoutes, GradoRoutes, SeccionRoutes, NivelRoutes, ColegioNiveloRoutes, ColegioGradoRoutes, ColegioSeccionRoutes, GeneroRoutes, FileRoutes, AsignadoRoutes, RolPermisoModuloRoutes, AlumnoRoutes, QRRoutes, AcademicoRoutes, AcademicoColegioRoutes, GrupoRoutes, TurnoRoutes, TurnoColegioRoutes, ApoderadoRoutes, ApoderadoAlumnoRoutes, ParentescoRoutes, PorteroRoutes, FcmRoutes, NotificacionRoutes } from "./modules/index.js";
import { DirectorRoutes } from "./modules/directores/index.js";
import { PersonaRolColegioRoutes, PersonaRolRoutes } from "./modules/gestiones/index.js";
import { MatriculaEstadoRoutes, MatriculaIngresoRoutes, MatriculaRoutes } from "./modules/matriculas/index.js";
import { AsistenciaProgramadoRoutes, AsistenciaRoutes } from "./modules/asistencias/index.js";


export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/apirest/grupo-academico', GrupoRoutes.routes);
        router.use('/apirest/turno', TurnoRoutes.routes);
        router.use('/apirest/turno-colegio', TurnoColegioRoutes.routes);
        router.use('/apirest/academico', AcademicoRoutes.routes);
        router.use('/apirest/academico-colegio', AcademicoColegioRoutes.routes);
        router.use('/apirest/file', FileRoutes.routes);
        router.use('/apirest/qr', QRRoutes.routes);

        router.use('/apirest/director', DirectorRoutes.routes);
        router.use('/apirest/apoderado', ApoderadoRoutes.routes);
        router.use('/apirest/apoderado-alumno', ApoderadoAlumnoRoutes.routes);
        router.use('/apirest/parentesco', ParentescoRoutes.routes);

        router.use('/apirest/genero', GeneroRoutes.routes);
        router.use('/apirest/tipo-documento', TipoDocumentoRoutes.routes);
        router.use('/apirest/alumno', AlumnoRoutes.routes);
        router.use('/apirest/persona', PersonaRoutes.routes);
        // router.use('/apirest/lectivo', AniolectivoRoutes.routes);
        router.use('/apirest/grado', GradoRoutes.routes);
        router.use('/apirest/seccion', SeccionRoutes.routes);
        router.use('/apirest/nivel', NivelRoutes.routes);

        router.use('/apirest/asistencia', AsistenciaRoutes.routes);
        router.use('/apirest/asistencia-programado', AsistenciaProgramadoRoutes.routes);

        router.use('/apirest/rol', RolRoutes.routes);
        router.use('/apirest/modulo', ModuloRoutes.routes);
        router.use('/apirest/permiso', PermisoRoutes.routes);
        router.use('/apirest/asignado', AsignadoRoutes.routes);
        router.use('/apirest/rol-permiso-modulo', RolPermisoModuloRoutes.routes);


        router.use('/apirest/persona-rol',PersonaRolRoutes.routes);
        router.use('/apirest/persona-rol-colegio',PersonaRolColegioRoutes.routes);

        router.use('/apirest/matricula',MatriculaRoutes.routes);
        router.use('/apirest/matricula-estado',MatriculaEstadoRoutes.routes);
        router.use('/apirest/matricula-ingreso',MatriculaIngresoRoutes.routes);

        // router.use('/apirest/docente', DocenteRoutes.routes);
        router.use('/apirest/apoderado', ApoderadoRoutes.routes);
        router.use('/apirest/portero', PorteroRoutes.routes);
        // router.use('/apirest/matricula', MatriculaRoutes.routes);
        router.use('/apirest/asistencia', AsistenciaRoutes.routes);
        router.use('/apirest/colegio', ColegioRoutes.routes);
        router.use('/apirest/colegionivel', ColegioNiveloRoutes.routes);
        router.use('/apirest/colegiogrado', ColegioGradoRoutes.routes);
        router.use('/apirest/colegioseccion', ColegioSeccionRoutes.routes);

        router.use('/apirest/fcm', FcmRoutes.routes);
        router.use('/apirest/notificacion', NotificacionRoutes.routes);
        router.use('/apirest/usuario', UsuarioRoutes.routes);
        router.use('/apirest', LoginRoutes.routes);

        
        // router.use('/apirest/token', TokenRoutes.routes);

        return router;
    }
}