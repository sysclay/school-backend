import { FilterClaseAsistenciaDto } from "../dtos/asistencia/filter.clase.asistencia.dto.js";
import { RegisterAsistenciaDto } from "../dtos/asistencia/register.asistencia.dto.js";
import { UpdateEntradaAsistenciaDto } from "../dtos/asistencia/update.entrada.asistencia.dto.js";
import { UpdateSalidaAsistenciaDto } from "../dtos/asistencia/update.salida.asistencia.dto.js";
import { AsistenciaEntityOu } from "../entities/ou/asistencia/asistencia.entity.js";

export abstract class AsistenciaRepository {

    abstract register(registerAsistenciaDto:RegisterAsistenciaDto): Promise<AsistenciaEntityOu>;
    abstract registerEntrada(codigo:string,updateEntradaAsistenciaDto:UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu>;
    abstract registerSalida(codigo:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu>;

    abstract findById(id:string):Promise<AsistenciaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaEntityOu|null>;
    abstract findAll():Promise<AsistenciaEntityOu|null>;
    abstract filterClaseLectiva(filterClaseAsistenciaDto:FilterClaseAsistenciaDto):Promise<AsistenciaEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}