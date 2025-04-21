
import { FilterAsistenciaNotiDto } from "../dtos/notificacion/filter.asistencia.notificacion.dto.js";
import { RegisterNotificacionDto } from "../dtos/notificacion/register.notificacion.dto.js";
import { NotificacionEntityOu } from "../entities/ou/notificacion.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class NotificacionDatasource {

    abstract register(registerNotificacionDto:RegisterNotificacionDto): Promise<NotificacionEntityOu>;
    abstract obtenerFcmApoderadoAlumno(filterAsistenciaNotiDto:FilterAsistenciaNotiDto): Promise<NotificacionEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<NotificacionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<NotificacionEntityOu|null>;
    // abstract findAll():Promise<NotificacionEntityOu|null>;
    // abstract filterAll(filterNotificacionDto:FilterNotificacionDto):Promise<NotificacionEntityOu>;
    // abstract updateQR(id:string):Promise<NotificacionEntityOu|null>;

    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}