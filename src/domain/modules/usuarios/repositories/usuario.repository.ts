import { RegisterUsuarioDto } from "../dtos/register.usuario.dto.js";
import { UpdateUsuarioDto } from "../dtos/update.usuario.dto.js";
import { UsuarioEntityOu } from "../entities/ou/usuario.entity.js";

export abstract class UsuarioRepository {

    abstract register(registerUsuarioDto:RegisterUsuarioDto,by:string): Promise<UsuarioEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<UsuarioEntityOu|null>;
    abstract findById(id:string):Promise<UsuarioEntityOu>;
    abstract findAll():Promise<UsuarioEntityOu>;
    abstract updateAll(id:string,updateUsuarioDto:UpdateUsuarioDto): Promise<UsuarioEntityOu>;
    abstract updateOne(id:string,updateUsuarioDto:UpdateUsuarioDto,by:string): Promise<UsuarioEntityOu>;
}