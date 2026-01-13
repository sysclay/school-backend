// import { FilterClaseAsistenciaDto } from "../dtos/asistencia/filter.clase.asistencia.dto.js";
import { RegisterAsistenciaEstadoDto } from "../dtos/register.asistencia.estado.dto.js";
// import { UpdateEntradaAsistenciaDto } from "../dtos/asistencia/update.entrada.asistencia.dto.js";
// import { UpdateSalidaAsistenciaDto } from "../dtos/asistencia/update.salida.asistencia.dto.js";
import { AsistenciaEstadoEntityOu } from "../entities/ou/asistencia.estado.entity.js";

export abstract class AsistenciaEstadoRepository {

    abstract register(registerAsistenciaEstadoDto:RegisterAsistenciaEstadoDto, by:string): Promise<AsistenciaEstadoEntityOu>;
    // abstract registerEntrada(codigo:string,updateEntradaAsistenciaDto:UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu>;
    // abstract registerSalida(codigo:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu>;

    // abstract findById(id:string):Promise<AsistenciaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaEntityOu|null>;
    // abstract findAll():Promise<AsistenciaEntityOu|null>;
    // abstract filterClaseLectiva(filterClaseAsistenciaDto:FilterClaseAsistenciaDto):Promise<AsistenciaEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}