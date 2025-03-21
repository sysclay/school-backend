import { RegisterGradoDto } from "../dtos/grado/register.grado.dto.js";
import { GradoEntityOu } from "../entities/ou/grado.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class GradoDatasource {

    abstract register(registerGradoDto:RegisterGradoDto): Promise<GradoEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<GradoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<GradoEntityOu|null>;
    abstract findAll():Promise<GradoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}