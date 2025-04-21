import { ValidarTokenDto } from "../dtos/token/validar.token.dto.js";
import { TokenEntityOu } from "../entities/ou/token.entity.js";

export abstract class TokenRepository {

    abstract validar(validarTokenDto:ValidarTokenDto): Promise<TokenEntityOu>;
    //abstract findById(id:string):Promise<SeccionEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<SeccionEntityOu|null>;
    // abstract findAll():Promise<SeccionEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}