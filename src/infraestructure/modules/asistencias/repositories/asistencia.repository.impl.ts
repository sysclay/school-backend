
import { AsistenciaDatasource, AsistenciaEntityOu, AsistenciaRepository, RegisterAsistenciaDto, ResumenAlumnoDto, ResumenAlumnoEntityOu, ResumenDayEntityOu, ResumenMonthDto, ResumenMonthEntityOu, UpdateAsistenciaDto } from "../../../../domain/index.js";
import { FilterAsistenciaDto } from "../../../../domain/modules/asistencias/dtos/filter.asistencia.dto.js";
import { FilterAsistenciaMarcadoDto } from "../../../../domain/modules/asistencias/dtos/filter.asistencia.marcado.dto.js";
import { ResumenDayDto } from "../../../../domain/modules/asistencias/dtos/resumen.day.dto.js";
import { AsistenciaMarcadoEntityOu } from "../../../../domain/modules/asistencias/entities/ou/asistencia.marcado.entity.js";

export class AsistenciaRepositoryImpl implements AsistenciaRepository {

    constructor(
        private readonly asistenciaDatasource: AsistenciaDatasource,
    ){}

    register(registerAsistenciaDto: RegisterAsistenciaDto, by:string): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.register(registerAsistenciaDto,by);
    } 

    filter(filterAsistenciaDto: FilterAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.filter(filterAsistenciaDto);
    }

    filterMarcado(filterAsistenciaMarcadoDto: FilterAsistenciaMarcadoDto,page: number, limit: number): Promise<AsistenciaMarcadoEntityOu> {
        return this.asistenciaDatasource.filterMarcado(filterAsistenciaMarcadoDto,page,limit);
    }

    update(id:string,updateAsistenciaDto: UpdateAsistenciaDto, by: string): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.update(id,updateAsistenciaDto,by)
    }

    resumenMonth(resumenMonthDto: ResumenMonthDto, page: number, limit: number): Promise<ResumenMonthEntityOu> {
        return this.asistenciaDatasource.resumenMonth(resumenMonthDto,page,limit)
    }

    resumenDay(resumenDayDto: ResumenDayDto, page: number, limit: number): Promise<ResumenDayEntityOu> {
        return this.asistenciaDatasource.resumenDay(resumenDayDto,page,limit)
    }

    resumenAlumno(resumenAlumnoDto: ResumenAlumnoDto, page: number, limit: number): Promise<ResumenAlumnoEntityOu> {
        return this.asistenciaDatasource.resumenAlumno(resumenAlumnoDto,page,limit)
    }

}