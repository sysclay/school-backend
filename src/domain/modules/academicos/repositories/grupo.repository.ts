import { RegisterGrupoDto } from "../dtos/register.grupo.dto.js";
import { GrupoEntityOu } from "../entities/ou/grupo.entity.js";

export abstract class GrupoRepository {

    abstract register(registerGrupoDto:RegisterGrupoDto, by:string): Promise<GrupoEntityOu>;

    
    abstract findById(id:string):Promise<GrupoEntityOu>;
    abstract findAll():Promise<GrupoEntityOu>;
    abstract findAllActive():Promise<GrupoEntityOu>;
}