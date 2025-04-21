import { ValidarTokenDto } from "../dtos/token/validar.token.dto.js";
import { TokenEntityOu } from "../entities/ou/token.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class TokenDatasource {

    abstract validar(validarTokenDto:ValidarTokenDto): Promise<TokenEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<TokenEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<TokenEntityOu|null>;
    // abstract findAll():Promise<TokenEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}