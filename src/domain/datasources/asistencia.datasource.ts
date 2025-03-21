import { RegisterAsistenciaDto } from "../dtos/asistencia/register.asistencia.dto.js";
import { UpdateEntradaAsistenciaDto } from "../dtos/asistencia/update.entrada.asistencia.dto.js";
import { UpdateSalidaAsistenciaDto } from "../dtos/asistencia/update.salida.asistencia.dto.js";
import { AsistenciaEntityOu } from "../entities/ou/asistencia.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AsistenciaDatasource {

    abstract register(registerAsistenciaDto:RegisterAsistenciaDto): Promise<AsistenciaEntityOu>;
    abstract registerEntrada(nro_documento:string,updateEntradaAsistenciaDto:UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu>;
    abstract registerSalida(nro_documento:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu>;

    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<AsistenciaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaEntityOu|null>;
    abstract findAll():Promise<AsistenciaEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}