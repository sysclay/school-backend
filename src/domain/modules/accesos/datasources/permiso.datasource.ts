

import { RegisterPermisoDto } from "../dtos/register.permiso.dto.js";
import { UpdatePermisoDto } from "../dtos/update.permiso.dto.js";
import { PermisoEntityOu } from "../entities/ou/permiso.entity.js";

export abstract class PermisoDatasource {

    abstract register(registerPermisoDto:RegisterPermisoDto, by:string): Promise<PermisoEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<AlumnoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AlumnoEntityOu|null>;
    abstract findAll():Promise<PermisoEntityOu>;
    abstract updateAll(id:string,updatePermisoDto:UpdatePermisoDto, by:string):Promise<PermisoEntityOu>;
    // abstract filterAll(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>;


}