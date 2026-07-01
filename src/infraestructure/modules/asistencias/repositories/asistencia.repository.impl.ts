// import {  AsistenciaDatasource, AsistenciaEntityOu, AsistenciaRepository, RegisterAsistenciaDto} from "../../../../domain/modulos/asistencia/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { AsistenciaDatasource, AsistenciaEntityOu, AsistenciaRepository, FilterMatriculaDto, RegisterAsistenciaDto, UpdateAsistenciaDto } from "../../../../domain/index.js";
import { FilterAsistenciaDto } from "../../../../domain/modules/asistencias/dtos/filter.asistencia.dto.js";
// import { UpdateAsistenciaDto } from "../../../../domain/modules/asistencias/dtos/update.asistencia.dto.js";

export class AsistenciaRepositoryImpl implements AsistenciaRepository {

    constructor(
        private readonly asistenciaDatasource: AsistenciaDatasource,
    ){}

    register(registerAsistenciaDto: RegisterAsistenciaDto, by:string): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.register(registerAsistenciaDto,by);
    } 

    // findById(id:string):Promise<AsistenciaEntityOu>{
    //    return this.asistenciaDatasource.findById(id);
    // }

    // findAll(page:number, limit:number):Promise<AsistenciaEntityOu>{
    //     return this.asistenciaDatasource.findAll(page, limit);
    // }

    // findAllActive(page: number, limit: number): Promise<AsistenciaEntityOu> {
    //     return this.asistenciaDatasource.findAllActive(page, limit);
    // }

    // findOne(id: string): Promise<AsistenciaEntityOu> {
    //     return this.asistenciaDatasource.findOne(id);
    // }

    filter(filterAsistenciaDto: FilterAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.filter(filterAsistenciaDto);
    }

    update(id:string,updateAsistenciaDto: UpdateAsistenciaDto, by: string): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.update(id,updateAsistenciaDto,by)
    }

}