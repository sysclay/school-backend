import { Router } from "express";
import { TipoDocumentoRoutes } from "./tipodocumento/router.js";
import { AlumnoRoutes } from "./alumno/router.js";
import { ColegioRoutes } from "./colegio/router.js";
import { AniolectivoRoutes } from "./aniolectivo/router.js";
import { GradoRoutes } from "./grado/router.js";
import { SeccionRoutes } from "./seccion/router.js";
import { UsuarioRoutes } from "./usuario/router.js";
import { UsuariorolRoutes } from "./usuariorol/router.js";
import { DocenteRoutes } from "./docente/router.js";
import { ApoderadoRoutes } from "./apoderado/router.js";
import { MatriculaRoutes } from "./matricula/router.js";
import { AsistenciaRoutes } from "./asistencia/router.js";
import { NotificacionRoutes } from "./notificacion/router.js";
import { FcmRoutes } from "./fcm/router.js";
import { TokenRoutes } from "./token/router.js";
import { PersonaRoutes } from "./persona/router.js";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/apirest/tipo-documento', TipoDocumentoRoutes.routes);
        router.use('/apirest/alumno', AlumnoRoutes.routes);
        router.use('/apirest/persona', PersonaRoutes.routes);
        router.use('/apirest/colegio', ColegioRoutes.routes);
        router.use('/apirest/lectivo', AniolectivoRoutes.routes);
        router.use('/apirest/grado', GradoRoutes.routes);
        router.use('/apirest/seccion', SeccionRoutes.routes);
        router.use('/apirest/usuariorol', UsuariorolRoutes.routes);
        router.use('/apirest/docente', DocenteRoutes.routes);
        router.use('/apirest/apoderado', ApoderadoRoutes.routes);
        router.use('/apirest/matricula', MatriculaRoutes.routes);
        router.use('/apirest/asistencia', AsistenciaRoutes.routes);

        router.use('/apirest/fcm', FcmRoutes.routes);
        router.use('/apirest/notificacion', NotificacionRoutes.routes);
        router.use('/apirest/usuario', UsuarioRoutes.routes);
        
        router.use('/apirest/token', TokenRoutes.routes);

        return router;
    }
}