import {  AsistenciaDatasource, AsistenciaEntityOu, AsistenciaRepository, FilterClaseAsistenciaDto, RegisterAsistenciaDto, UpdateEntradaAsistenciaDto, UpdateSalidaAsistenciaDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class AsistenciaRepositoryImpl implements AsistenciaRepository {

    constructor(
        private readonly asistenciaDatasource: AsistenciaDatasource,
    ){}

    register(registerAsistenciaDto: RegisterAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.register(registerAsistenciaDto);
    }

    registerEntrada(codigo:string,updateEntradaAsistenciaDto: UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.registerEntrada(codigo,updateEntradaAsistenciaDto);
    } 

    registerSalida(codigo:string,updateSalidaAsistenciaDto: UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.registerSalida(codigo,updateSalidaAsistenciaDto);
    } 

    findById(id:string):Promise<AsistenciaEntityOu|null>{
        return this.asistenciaDatasource.findById(id);
    }

    findAll():Promise<AsistenciaEntityOu|null>{
        return this.asistenciaDatasource.findAll();
    }

    filterClaseLectiva(filterClaseAsistenciaDto: FilterClaseAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.filterClaseLectiva(filterClaseAsistenciaDto);
        
    }

}