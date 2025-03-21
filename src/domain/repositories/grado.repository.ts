import { RegisterGradoDto } from "../dtos/grado/register.grado.dto.js";
import { GradoEntityOu } from "../entities/ou/grado.entity.js";

export abstract class GradoRepository {

    abstract register(registerGradoDto:RegisterGradoDto): Promise<GradoEntityOu>;
    //abstract findById(id:string):Promise<GradoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<GradoEntityOu|null>;
    abstract findAll():Promise<GradoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}