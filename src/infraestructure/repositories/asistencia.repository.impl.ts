import {  AsistenciaDatasource, AsistenciaEntityOu, AsistenciaRepository, RegisterAsistenciaDto, UpdateEntradaAsistenciaDto, UpdateSalidaAsistenciaDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class AsistenciaRepositoryImpl implements AsistenciaRepository {

    constructor(
        private readonly asistenciaDatasource: AsistenciaDatasource,
    ){}

    register(registerAsistenciaDto: RegisterAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.register(registerAsistenciaDto);
    }

    registerEntrada(nro_documento:string,updateEntradaAsistenciaDto: UpdateEntradaAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.registerEntrada(nro_documento,updateEntradaAsistenciaDto);
    } 

    registerSalida(nro_documento:string,updateSalidaAsistenciaDto: UpdateSalidaAsistenciaDto): Promise<AsistenciaEntityOu> {
        return this.asistenciaDatasource.registerSalida(nro_documento,updateSalidaAsistenciaDto);
    } 

    findById(id:string):Promise<AsistenciaEntityOu|null>{
        return this.asistenciaDatasource.findById(id);
    }

    findAll():Promise<AsistenciaEntityOu|null>{
        return this.asistenciaDatasource.findAll();
    }

}