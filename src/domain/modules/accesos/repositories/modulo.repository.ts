
import { RegisterModuloDto } from "../dtos/register.modulo.dto.js";
import { UpdateModuloDto } from "../dtos/update.modulo.dto.js";
import { ModuloEntityOu } from "../entities/ou/modulo.entity.js";

export abstract class ModuloRepository {

    abstract register(registerModuloDto:RegisterModuloDto, by:string): Promise<ModuloEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<AlumnoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AlumnoEntityOu|null>;
    abstract findAll():Promise<ModuloEntityOu>;
    // abstract updateAll(id:string,updateModuloDto:UpdateModuloDto):Promise<ModuloEntityOu>;
    // abstract filterAll(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>;
    abstract updateAll(id:string,updateModuloDto:UpdateModuloDto, by:string): Promise<ModuloEntityOu>;


}