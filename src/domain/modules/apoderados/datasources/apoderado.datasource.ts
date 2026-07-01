import { FilterApoderadoDto } from "../dtos/filter.apoderado.dto.js";
import { RegisterApoderadoDto } from "../dtos/register.apoderado.dto.js";
import { ApoderadoEntityOu } from "../entities/ou/apoderado.entity.js";
import { FilterApoderadoEntityOu } from "../entities/ou/filter.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class ApoderadoDatasource {

    abstract register(registerApoderadoDto:RegisterApoderadoDto, by:string): Promise<ApoderadoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<ApoderadoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ApoderadoEntityOu|null>;
    abstract findAll():Promise<ApoderadoEntityOu>;
    abstract findAllColegio(id_colegio:string):Promise<ApoderadoEntityOu>;
    abstract filterAll(filterApoderadoDto:FilterApoderadoDto):Promise<ApoderadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}