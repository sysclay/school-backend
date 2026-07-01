import { FilterApoderadoDto } from "../dtos/filter.apoderado.dto.js";
import { RegisterApoderadoDto } from "../dtos/register.apoderado.dto.js";
import { ApoderadoEntityOu } from "../entities/ou/apoderado.entity.js";
import { FilterApoderadoEntityOu } from "../entities/ou/filter.entity.js";

export abstract class ApoderadoRepository {

    abstract register(registerApoderadoDto:RegisterApoderadoDto,by:string): Promise<ApoderadoEntityOu>;
    abstract findById(id:string):Promise<ApoderadoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ApoderadoEntityOu|null>;
    abstract findAll():Promise<ApoderadoEntityOu>;
    abstract findAllColegio(id_colegio:string):Promise<ApoderadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    abstract filterAll(filterApoderadoDto:FilterApoderadoDto):Promise<ApoderadoEntityOu>;
}