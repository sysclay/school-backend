import { RegisterNivelDto } from "../dtos/register.nivel.dto.js";
import { UpdateNivelDto } from "../dtos/update.nivel.dto.js";
import { NivelEntityOu } from "../entities/ou/nivel.entity.js";

export abstract class NivelRepository {

    abstract register(registerNivelDto:RegisterNivelDto,by:string): Promise<NivelEntityOu>;

    abstract findById(id:string):Promise<NivelEntityOu>;
    abstract findAll():Promise<NivelEntityOu>;
    abstract findAllActive():Promise<NivelEntityOu>;

    abstract updateAll(id:string,updateNivelDto:UpdateNivelDto,by:string): Promise<NivelEntityOu>;
}