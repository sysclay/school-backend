// import { FilterClaseAsistenciaDto } from "../dtos/filter.clase.asistencia.dto.js";
import { RegisterAsistenciaEstadoDto } from "../dtos/register.asistencia.estado.dto.js";
// import { UpdateEntradaAsistenciaDto } from "../dtos/update.entrada.asistencia.dto.js";
// import { UpdateSalidaAsistenciaDto } from "../dtos/update.salida.asistencia.dto.js";
import { AsistenciaEstadoEntityOu } from "../entities/ou/asistencia.estado.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AsistenciaEstadoDatasource {

    abstract register(registerAsistenciaEstadoDto:RegisterAsistenciaEstadoDto, by:string): Promise<AsistenciaEstadoEntityOu>;
    // abstract registerEntrada(codigo:string,updateEntradaAsistenciaDto:UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu>;
    // abstract registerSalida(codigo:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu>;

    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<AsistenciaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaEntityOu|null>;
    // abstract findAll():Promise<AsistenciaEntityOu|null>;
    // abstract filterClaseLectiva(filterClaseAsistenciaDto:FilterClaseAsistenciaDto):Promise<AsistenciaEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}