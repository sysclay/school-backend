import { RegisterColegioDto } from "../dtos/colegio/register.colegio.dto.js";
import { ColegioEntityOu } from "../entities/ou/colegio.entity.js";

export abstract class ColegioRepository {

    abstract register(registerColegioDto:RegisterColegioDto): Promise<ColegioEntityOu>;
    //abstract findById(id:string):Promise<ColegioEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll():Promise<ColegioEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}