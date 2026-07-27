// import { FilterClaseAsistenciaDto } from "../dtos/filter.clase.asistencia.dto.js";
import { FilterAsistenciaDto } from "../dtos/filter.asistencia.dto.js";
import { FilterAsistenciaMarcadoDto } from "../dtos/filter.asistencia.marcado.dto.js";
import { RegisterAsistenciaDto } from "../dtos/register.asistencia.dto.js";
import { ResumenAlumnoDto } from "../dtos/resumen.alumno.dto.js";
import { ResumenDayDto } from "../dtos/resumen.day.dto.js";
import { ResumenMonthDto } from "../dtos/resumen.month.dto.js";
import { UpdateAsistenciaDto } from "../dtos/update.asistencia.dto.js";
// import { UpdateEntradaAsistenciaDto } from "../dtos/update.entrada.asistencia.dto.js";
// import { UpdateSalidaAsistenciaDto } from "../dtos/update.salida.asistencia.dto.js";
import { AsistenciaEntityOu } from "../entities/ou/asistencia.entity.js";
import { AsistenciaMarcadoEntityOu } from "../entities/ou/asistencia.marcado.entity.js";
import { ResumenAlumnoEntityOu } from "../entities/ou/resumen.alumno.entity.js";
import { ResumenDayEntityOu } from "../entities/ou/resumen.day.entity.js";
import { ResumenMonthEntityOu } from "../entities/ou/resumen.month.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AsistenciaDatasource {

    abstract register(registerAsistenciaDto:RegisterAsistenciaDto, by:string): Promise<AsistenciaEntityOu>;
    abstract filter(filterAsistenciaDto:FilterAsistenciaDto):Promise<AsistenciaEntityOu>;
    abstract update(id:string,updateAsistenciaDto:UpdateAsistenciaDto,by:string): Promise<AsistenciaEntityOu>;

    abstract filterMarcado(filterAsistenciaMarcadoDto:FilterAsistenciaMarcadoDto,page:number, limit:number):Promise<AsistenciaMarcadoEntityOu>;

    abstract resumenMonth(resumenMonthDto:ResumenMonthDto,page:number, limit:number):Promise<ResumenMonthEntityOu>;
    abstract resumenDay(resumenDayDto:ResumenDayDto,page:number, limit:number):Promise<ResumenDayEntityOu>;
    abstract resumenAlumno(resumenAlumnoDto:ResumenAlumnoDto,page:number, limit:number):Promise<ResumenAlumnoEntityOu>;


}