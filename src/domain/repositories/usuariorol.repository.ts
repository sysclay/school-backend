import { RegisterUsuariorolDto } from "../dtos/usuariorol/register.usuariorol.dto.js";
import { UsuariorolEntityOu } from "../entities/ou/usuariorol.entity.js";

export abstract class UsuariorolRepository {

    abstract register(registerUsuariorolDto:RegisterUsuariorolDto): Promise<UsuariorolEntityOu>;
    //abstract findById(id:string):Promise<UsuariorolEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<UsuariorolEntityOu|null>;
    abstract findAll():Promise<UsuariorolEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}