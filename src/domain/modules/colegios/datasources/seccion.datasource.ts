import { RegisterSeccionDto } from "../../colegios/dtos/register.seccion.dto.js";
import { UpdateSeccionDto } from "../dtos/update.seccion.dto.js";
import { SeccionEntityOu } from "../entities/ou/seccion.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class SeccionDatasource {

    abstract register(registerSeccionDto:RegisterSeccionDto,by:string): Promise<SeccionEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<SeccionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<SeccionEntityOu|null>;
    abstract findAll():Promise<SeccionEntityOu>;
    
    abstract updateAll(id:string,updateSeccionDto:UpdateSeccionDto,by:string): Promise<SeccionEntityOu>;

}