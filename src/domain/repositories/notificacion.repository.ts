// import { FilterNotificacionDto } from "../dtos/Notificacion/filter.Notificacion.dto.js";
import { RegisterNotificacionDto } from "../dtos/notificacion/register.notificacion.dto.js";
import { NotificacionEntityOu } from "../entities/ou/notificacion.entity.js";

export abstract class NotificacionRepository {

    abstract register(registerNotificacionDto:RegisterNotificacionDto): Promise<NotificacionEntityOu>;
    // abstract findById(id:string):Promise<NotificacionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<NotificacionEntityOu|null>;
    // abstract findAll():Promise<NotificacionEntityOu|null>;
    // abstract filterAll(filterNotificacionDto:FilterNotificacionDto):Promise<NotificacionEntityOu>;
    // abstract updateQR(id:string):Promise<NotificacionEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}