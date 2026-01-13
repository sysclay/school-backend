

import { RegisterModuloDto } from "../dtos/register.modulo.dto.js";
import { UpdateModuloDto } from "../dtos/update.modulo.dto.js";
import { ModuloEntityOu } from "../entities/ou/modulo.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class ModuloDatasource {

    abstract register(registerModuloDto:RegisterModuloDto, by:string): Promise<ModuloEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<ModuloEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ModuloEntityOu|null>;
    abstract findAll():Promise<ModuloEntityOu>;

    // abstract seleccion(seleccionModuloDto:SeleccionModuloDto):Promise<ModuloEntityOu>;
    abstract updateAll(id:string,updateModuloDto:UpdateModuloDto, by:string): Promise<ModuloEntityOu>;

}