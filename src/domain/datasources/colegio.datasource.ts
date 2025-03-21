import { RegisterColegioDto } from "../dtos/colegio/register.colegio.dto.js";
import { ColegioEntityOu } from "../entities/ou/colegio.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class ColegioDatasource {

    abstract register(registerColegioDto:RegisterColegioDto): Promise<ColegioEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<ColegioEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll():Promise<ColegioEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}