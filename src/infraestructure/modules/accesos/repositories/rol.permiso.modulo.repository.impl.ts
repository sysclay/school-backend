import {  RolPermisoModuloDatasource, RolPermisoModuloEntityOu, RolPermisoModuloRepository, RegisterRolPermisoModuloDto} from "../../../../domain/index.js";
// import { RegisterTipoRolPermisoModuloDto } from "../../domain/dtos/tipoRolPermisoModulo/register.RolPermisoModulo.dto";

export class RolPermisoModuloRepositoryImpl implements RolPermisoModuloRepository {

    constructor(
        private readonly RolPermisoModuloDatasource: RolPermisoModuloDatasource,
    ){}

    register(registerRolPermisoModuloDto: RegisterRolPermisoModuloDto, by:string): Promise<RolPermisoModuloEntityOu> {
        return this.RolPermisoModuloDatasource.register(registerRolPermisoModuloDto, by);
    }

    findAll():Promise<RolPermisoModuloEntityOu>{
        return this.RolPermisoModuloDatasource.findAll();
    }



}