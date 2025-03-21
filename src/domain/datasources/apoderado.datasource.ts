import { RegisterApoderadoDto } from "../dtos/apoderado/register.apoderado.dto.js";
import { ApoderadoEntityOu } from "../entities/ou/apoderado.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class ApoderadoDatasource {

    abstract register(registerApoderadoDto:RegisterApoderadoDto): Promise<ApoderadoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<ApoderadoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ApoderadoEntityOu|null>;
    abstract findAll():Promise<ApoderadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}