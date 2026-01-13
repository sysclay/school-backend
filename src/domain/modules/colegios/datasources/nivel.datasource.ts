import { RegisterNivelDto } from "../dtos/register.nivel.dto.js";
import { UpdateNivelDto } from "../dtos/update.nivel.dto.js";
import { NivelEntityOu } from "../entities/ou/nivel.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class NivelDatasource {

    abstract register(registerNivelDto:RegisterNivelDto,by:string): Promise<NivelEntityOu>;
    
    abstract findById(id:string):Promise<NivelEntityOu>;
    abstract findAll():Promise<NivelEntityOu>;
    abstract findAllActive():Promise<NivelEntityOu>;
    // abstract filter():Promise<NivelEntityOu>;

    abstract updateAll(id:string,updateNivelDto:UpdateNivelDto,by:string): Promise<NivelEntityOu>;

}