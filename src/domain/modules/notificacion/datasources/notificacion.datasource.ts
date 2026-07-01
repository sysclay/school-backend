// import { FilterNotificacionDto } from "../dtos/Notificacion/filter.Notificacion.dto.js";
// import { FilterAsistenciaNotiDto } from "../dtos/notificacion/filter.asistencia.notificacion.dto.js";
import { RegisterNotificacionDto } from "../dtos/register.notificacion.dto.js";
import { NotificacionEntityOu } from "../entities/ou/notificacion.entity.js";

export abstract class NotificacionDatasource {

    abstract register(registerNotificacionDto:RegisterNotificacionDto): Promise<NotificacionEntityOu>;
    // abstract obtenerFcmApoderadoAlumno(filterAsistenciaNotiDto:FilterAsistenciaNotiDto): Promise<NotificacionEntityOu>;
    // abstract findById(id:string):Promise<NotificacionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<NotificacionEntityOu|null>;
    // abstract findAll():Promise<NotificacionEntityOu|null>;
    // abstract filterAll(filterNotificacionDto:FilterNotificacionDto):Promise<NotificacionEntityOu>;
    // abstract updateQR(id:string):Promise<NotificacionEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}