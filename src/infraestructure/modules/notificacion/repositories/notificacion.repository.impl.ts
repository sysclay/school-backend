// import {  FilterAsistenciaNotiDto, NotificacionDatasource, NotificacionEntityOu, NotificacionRepository, RegisterNotificacionDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { NotificacionDatasource, NotificacionEntityOu, NotificacionRepository, RegisterNotificacionDto } from "../../../../domain/index.js";

export class NotificacionRepositoryImpl implements NotificacionRepository {

    constructor(
        private readonly notificacionDatasource: NotificacionDatasource,
    ){}

    register(registerNotificacionDto: RegisterNotificacionDto): Promise<NotificacionEntityOu> {
        return this.notificacionDatasource.register(registerNotificacionDto);
    } 

    // obtenerFcmApoderadoAlumno(filterAsistenciaNotiDto:FilterAsistenciaNotiDto): Promise<NotificacionEntityOu> {
    //     return this.notificacionDatasource.obtenerFcmApoderadoAlumno(filterAsistenciaNotiDto);
    // } 
    
    // findById(id:string):Promise<NotificacionEntityOu|null>{
    //     return this.NotificacionDatasource.findById(id);
    // }

    // findAll():Promise<NotificacionEntityOu|null>{
    //     return this.NotificacionDatasource.findAll();
    // }

    // filterAll(filterNotificacionDto:FilterNotificacionDto):Promise<NotificacionEntityOu>{
    //     return this.NotificacionDatasource.filterAll(filterNotificacionDto);
    // }

    // updateQR(id:string):Promise<NotificacionEntityOu|null>{
    //     return this.NotificacionDatasource.updateQR(id);
    // }

}