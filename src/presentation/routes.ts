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
import { authMiddleware } from "./middlewares/AuthMiddleware.js";
import { MatriculaRoutes } from "./matricula/router.js";
import { AsistenciaRoutes } from "./asistencia/router.js";
import { NotificacionRoutes } from "./notificacion/router.js";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/apirest/tipo-documento', authMiddleware, TipoDocumentoRoutes.routes);
        router.use('/apirest/alumno',authMiddleware, AlumnoRoutes.routes);
        router.use('/apirest/colegio',authMiddleware, ColegioRoutes.routes);
        router.use('/apirest/lectivo',authMiddleware, AniolectivoRoutes.routes);
        router.use('/apirest/grado',authMiddleware, GradoRoutes.routes);
        router.use('/apirest/seccion',authMiddleware, SeccionRoutes.routes);
        router.use('/apirest/usuariorol',authMiddleware, UsuariorolRoutes.routes);
        router.use('/apirest/docente',authMiddleware, DocenteRoutes.routes);
        router.use('/apirest/apoderado',authMiddleware, ApoderadoRoutes.routes);
        router.use('/apirest/matricula',authMiddleware, MatriculaRoutes.routes);
        router.use('/apirest/asistencia',authMiddleware, AsistenciaRoutes.routes);

        router.use('/apirest/notificacion', NotificacionRoutes.routes);

        router.use('/apirest/usuario', UsuarioRoutes.routes);

        return router;
    }
}