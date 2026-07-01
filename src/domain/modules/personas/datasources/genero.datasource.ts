import { RegisterGeneroDto } from "../dtos/register.genero.dto.js";
import { GeneroEntityOu } from "../entities/ou/genero.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class GeneroDatasource {

    abstract register(registerGeneroDto:RegisterGeneroDto, by:string): Promise<GeneroEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<GeneroEntityOu>;
    // abstract findByNameCorto(nom_corto:string):Promise<GeneroEntityOu|null>;
    abstract findAll():Promise<GeneroEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}