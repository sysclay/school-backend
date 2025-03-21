import { RegisterApoderadoDto } from "../dtos/apoderado/register.apoderado.dto.js";
import { ApoderadoEntityOu } from "../entities/ou/apoderado.entity.js";

export abstract class ApoderadoRepository {

    abstract register(registerApoderadoDto:RegisterApoderadoDto): Promise<ApoderadoEntityOu>;
    abstract findById(id:string):Promise<ApoderadoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ApoderadoEntityOu|null>;
    abstract findAll():Promise<ApoderadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}