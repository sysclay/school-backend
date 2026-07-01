

import { RegisterRolPermisoModuloDto } from "../dtos/register.rol.permiso.modulo.dto.js";
// import { UpdateRolPermisoModuloDto } from "../dtos/update.RolPermisoModulo.dto.js";
import { RolPermisoModuloEntityOu } from "../entities/ou/rol.permiso.modulo.entity.js";

export abstract class RolPermisoModuloDatasource {

    abstract register(registerRolPermisoModuloDto:RegisterRolPermisoModuloDto, by:string): Promise<RolPermisoModuloEntityOu>;
    abstract findAll():Promise<RolPermisoModuloEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<AlumnoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AlumnoEntityOu|null>;
    // abstract updateAll(id:string,updateRolPermisoModuloDto:UpdateRolPermisoModuloDto):Promise<RolPermisoModuloEntityOu>;
    // abstract filterAll(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>;


}