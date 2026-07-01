// import { FilterClaseAsistenciaDto } from "../dtos/filter.clase.asistencia.dto.js";
import { FilterAsistenciaDto } from "../dtos/filter.asistencia.dto.js";
import { RegisterAsistenciaDto } from "../dtos/register.asistencia.dto.js";
import { UpdateAsistenciaDto } from "../dtos/update.asistencia.dto.js";
// import { UpdateEntradaAsistenciaDto } from "../dtos/update.entrada.asistencia.dto.js";
// import { UpdateSalidaAsistenciaDto } from "../dtos/update.salida.asistencia.dto.js";
import { AsistenciaEntityOu } from "../entities/ou/asistencia.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AsistenciaDatasource {

    abstract register(registerAsistenciaDto:RegisterAsistenciaDto, by:string): Promise<AsistenciaEntityOu>;
    // abstract registerEntrada(codigo:string,updateEntradaAsistenciaDto:UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu>;
    // abstract registerSalida(codigo:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu>;

    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<AsistenciaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AsistenciaEntityOu|null>;
    // abstract findAll():Promise<AsistenciaEntityOu|null>;
    abstract filter(filterAsistenciaDto:FilterAsistenciaDto):Promise<AsistenciaEntityOu>;
    abstract update(id:string,updateAsistenciaDto:UpdateAsistenciaDto,by:string): Promise<AsistenciaEntityOu>;

}