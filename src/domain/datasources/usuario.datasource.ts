import { LoginUsuarioDto } from "../dtos/usuario/login.usuario.dto.js";
import { RegisterUsuarioDto } from "../dtos/usuario/register.usuario.dto.js";
import { UpdateUsuarioDto } from "../dtos/usuario/update.usuario.dto.js";
import { UpdateEntityMessageOu } from "../entities/ou/update.entity.js";
import { UsuarioEntityOu } from "../entities/ou/usuario.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class UsuarioDatasource {

    abstract register(registerUsuarioDto:RegisterUsuarioDto): Promise<UsuarioEntityOu>;
    abstract login(loginUsuarioDto:LoginUsuarioDto): Promise<UsuarioEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<UsuarioEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<UsuarioEntityOu|null>;
    abstract findAll():Promise<UsuarioEntityOu>;
    abstract updateAll(id:string,updateUsuarioDto:UpdateUsuarioDto): Promise<UsuarioEntityOu>;

}