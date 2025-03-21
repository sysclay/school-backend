
import { RegisterUsuariorolDto } from "../dtos/usuariorol/register.usuariorol.dto.js";
import { UsuariorolEntityOu } from "../entities/ou/usuariorol.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class UsuariorolDatasource {

    abstract register(registerUsuariorolDto:RegisterUsuariorolDto): Promise<UsuariorolEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<UsuariorolEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<UsuariorolEntityOu|null>;
    abstract findAll():Promise<UsuariorolEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}