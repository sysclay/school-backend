// import { FilterClaseAsistenciaProgramadoDto } from "../dtos/asistenciaprogramado/filter.clase.asistenciaprogramado.dto.js";
import { RegisterAsistenciaProgramadoDto } from "../dtos/register.asistencia.programado.dto.js";
import { FilterAsistenciaProgramadoDto } from "../dtos/filter.asistencia.programado.dto.js";
// import { UpdateEntradaAsistenciaProgramadoDto } from "../dtos/asistenciaprogramado/update.entrada.asistenciaprogramado.dto.js";
// import { UpdateSalidaAsistenciaProgramadoDto } from "../dtos/asistenciaprogramado/update.salida.asistenciaprogramado.dto.js";
import { AsistenciaProgramadoEntityOu } from "../entities/ou/asistencia.programado.entity.js";

export abstract class AsistenciaProgramadoRepository {

    abstract register(registerAsistenciaProgramadoDto:RegisterAsistenciaProgramadoDto, by:string): Promise<AsistenciaProgramadoEntityOu>;
    // abstract registerEntrada(codigo:string,updateEntradaAsistenciaProgramadoDto:UpdateEntradaAsistenciaProgramadoDto): Promise<AsistenciaProgramadoEntityOu>;
    // abstract registerSalida(codigo:string,updateSalidaAsistenciaProgramadoDto:UpdateSalidaAsistenciaProgramadoDto): Promise<AsistenciaProgramadoEntityOu>;

    // abstract findById(id:string):Promise<AsistenciaProgramadoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaProgramadoEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>;
    abstract findAllActive(page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>;
    abstract findAllFilter(filterAsistenciaProgramadoDto:FilterAsistenciaProgramadoDto,page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>;
    // abstract filterClaseLectiva(filterClaseAsistenciaProgramadoDto:FilterClaseAsistenciaProgramadoDto):Promise<AsistenciaProgramadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}