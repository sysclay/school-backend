import { RegisterGradoDto } from "../dtos/register.grado.dto.js";
import { UpdateGradoDto } from "../dtos/update.grado.dto.js";
import { GradoEntityOu } from "../entities/ou/grado.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class GradoDatasource {

    abstract register(registerGradoDto:RegisterGradoDto,by:string): Promise<GradoEntityOu>;

    abstract findById(id:string):Promise<GradoEntityOu>;
    abstract findAll():Promise<GradoEntityOu>;

    abstract updateAll(id:string,updateGradoDto:UpdateGradoDto,by:string): Promise<GradoEntityOu>;

}