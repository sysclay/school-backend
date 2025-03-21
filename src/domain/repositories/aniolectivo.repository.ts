import { RegisterAniolectivoDto } from "../dtos/aniolectivo/register.aniolectivo.dto.js";
import { AniolectivoEntityOu } from "../entities/ou/aniolectivo.entity.js";

export abstract class AniolectivoRepository {

    abstract register(registerAniolectivoDto:RegisterAniolectivoDto): Promise<AniolectivoEntityOu>;
    //abstract findById(id:string):Promise<AniolectivoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AniolectivoEntityOu|null>;
    abstract findAll():Promise<AniolectivoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}