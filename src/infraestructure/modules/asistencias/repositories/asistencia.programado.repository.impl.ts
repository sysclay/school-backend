// import {  AsistenciaProgramadoDatasource, AsistenciaProgramadoEntityOu, AsistenciaProgramadoRepository, RegisterAsistenciaProgramadoDto} from "../../../../domain/modulos/asistenciaprogramado/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { AsistenciaProgramadoDatasource, AsistenciaProgramadoEntityOu, AsistenciaProgramadoRepository, FilterAsistenciaProgramadoDto, RegisterAsistenciaProgramadoDto } from "../../../../domain/index.js";
// import { UpdateAsistenciaProgramadoDto } from "../../../../domain/modules/asistenciaprogramados/dtos/update.asistenciaprogramado.dto.js";

export class AsistenciaProgramadoRepositoryImpl implements AsistenciaProgramadoRepository {

    constructor(
        private readonly asistenciaprogramadoDatasource: AsistenciaProgramadoDatasource,
    ){}

    register(registerAsistenciaProgramadoDto: RegisterAsistenciaProgramadoDto, by:string): Promise<AsistenciaProgramadoEntityOu> {
        return this.asistenciaprogramadoDatasource.register(registerAsistenciaProgramadoDto,by);
    } 

    // findById(id:string):Promise<AsistenciaProgramadoEntityOu>{
    //    return this.asistenciaprogramadoDatasource.findById(id);
    // }

    findAll(page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>{
        return this.asistenciaprogramadoDatasource.findAll(page, limit);
    }

    findAllActive(page: number, limit: number): Promise<AsistenciaProgramadoEntityOu> {
        return this.asistenciaprogramadoDatasource.findAllActive(page, limit);
    }

    findAllFilter( filterAsistenciaProgramadoDto:FilterAsistenciaProgramadoDto,page: number, limit: number): Promise<AsistenciaProgramadoEntityOu> {
        return this.asistenciaprogramadoDatasource.findAllFilter(filterAsistenciaProgramadoDto,page, limit);
    }

    // findOne(id: string): Promise<AsistenciaProgramadoEntityOu> {
    //     return this.asistenciaprogramadoDatasource.findOne(id);
    // }

    // updateAll(updateAsistenciaProgramadoDto: UpdateAsistenciaProgramadoDto, by: string): Promise<AsistenciaProgramadoEntityOu> {
    //     return this.asistenciaprogramadoDatasource.updateAll(updateAsistenciaProgramadoDto,by)
    // }

}