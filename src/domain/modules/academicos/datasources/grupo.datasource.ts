import { RegisterGrupoDto } from "../dtos/register.grupo.dto.js";
import { GrupoEntityOu } from "../entities/ou/grupo.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class GrupoDatasource {

    abstract register(registerGrupoDto:RegisterGrupoDto, by:string): Promise<GrupoEntityOu>;
    abstract findById(id:string):Promise<GrupoEntityOu>;
    abstract findAll():Promise<GrupoEntityOu>;
    abstract findAllActive():Promise<GrupoEntityOu>;

}