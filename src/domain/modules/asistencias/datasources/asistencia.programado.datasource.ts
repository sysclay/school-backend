// import { FilterClaseAsistenciaProgramadoDto } from "../dtos/filter.clase.asistenciaprogramado.dto.js";
import { FilterAsistenciaProgramadoDto } from "../dtos/filter.asistencia.programado.dto.js";
import { RegisterAsistenciaProgramadoDto } from "../dtos/register.asistencia.programado.dto.js";
// import { UpdateEntradaAsistenciaProgramadoDto } from "../dtos/update.entrada.asistenciaprogramado.dto.js";
// import { UpdateSalidaAsistenciaProgramadoDto } from "../dtos/update.salida.asistenciaprogramado.dto.js";
import { AsistenciaProgramadoEntityOu } from "../entities/ou/asistencia.programado.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AsistenciaProgramadoDatasource {

    abstract register(registerAsistenciaProgramadoDto:RegisterAsistenciaProgramadoDto, by:string): Promise<AsistenciaProgramadoEntityOu>;
    // abstract registerEntrada(codigo:string,updateEntradaAsistenciaProgramadoDto:UpdateEntradaAsistenciaProgramadoDto): Promise<AsistenciaProgramadoEntityOu>;
    // abstract registerSalida(codigo:string,updateSalidaAsistenciaProgramadoDto:UpdateSalidaAsistenciaProgramadoDto): Promise<AsistenciaProgramadoEntityOu>;

    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<AsistenciaProgramadoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaProgramadoEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>;
    abstract findAllActive(page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>;
    abstract findAllFilter(filterAsistenciaProgramadoDto:FilterAsistenciaProgramadoDto,page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>;
    // abstract filterClaseLectiva(filterClaseAsistenciaProgramadoDto:FilterClaseAsistenciaProgramadoDto):Promise<AsistenciaProgramadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}