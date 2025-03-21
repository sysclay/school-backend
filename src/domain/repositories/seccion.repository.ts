import { RegisterSeccionDto } from "../dtos/seccion/register.seccion.dto.js";
import { SeccionEntityOu } from "../entities/ou/seccion.entity.js";

export abstract class SeccionRepository {

    abstract register(registerSeccionDto:RegisterSeccionDto): Promise<SeccionEntityOu>;
    //abstract findById(id:string):Promise<SeccionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<SeccionEntityOu|null>;
    abstract findAll():Promise<SeccionEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}