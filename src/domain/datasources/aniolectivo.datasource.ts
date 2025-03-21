import { RegisterAniolectivoDto } from "../dtos/aniolectivo/register.aniolectivo.dto.js";
import { AniolectivoEntityOu } from "../entities/ou/aniolectivo.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AniolectivoDatasource {

    abstract register(registerAniolectivoDto:RegisterAniolectivoDto): Promise<AniolectivoEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<AniolectivoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AniolectivoEntityOu|null>;
    abstract findAll():Promise<AniolectivoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}