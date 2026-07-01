import { RegisterSeccionDto } from "../dtos/register.seccion.dto.js";
import { UpdateSeccionDto } from "../dtos/update.seccion.dto.js";
import { SeccionEntityOu } from "../entities/ou/seccion.entity.js";

export abstract class SeccionRepository {

    abstract register(registerSeccionDto:RegisterSeccionDto,by:string): Promise<SeccionEntityOu>;
    //abstract findById(id:string):Promise<SeccionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<SeccionEntityOu|null>;
    abstract findAll():Promise<SeccionEntityOu>;
    abstract updateAll(id:string,updateSeccionDto:UpdateSeccionDto,by:string): Promise<SeccionEntityOu>;
}