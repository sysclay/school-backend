import { RegisterGeneroDto } from "../dtos/register.genero.dto.js";
import { GeneroEntityOu } from "../entities/ou/genero.entity.js";

export abstract class GeneroRepository {

    abstract register(registerGeneroDto:RegisterGeneroDto, by:string): Promise<GeneroEntityOu>;
    abstract findById(id:string):Promise<GeneroEntityOu>;
    // abstract findByNameCorto(nom_corto:string):Promise<GeneroEntityOu>;
    abstract findAll():Promise<GeneroEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}