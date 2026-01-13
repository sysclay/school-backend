import { FilterPersonaDto } from "../dtos/filter.persona.dto.js";
import { RegisterPersonaDto } from "../dtos/register.persona.dto.js";
import { UpdatePersonaDto } from "../dtos/update.persona.dto.js";
import { PersonaEntityOu } from "../entities/ou/persona.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class PersonaDatasource {

    abstract register(registerPersonaDto:RegisterPersonaDto, by:string): Promise<PersonaEntityOu>;
    abstract findAll(page:number, limit:number):Promise<PersonaEntityOu>;
    abstract findById(id:string):Promise<PersonaEntityOu>;
    abstract findByIdPerfil(id:string):Promise<PersonaEntityOu>;
    abstract findByNDoc(ndoc:string):Promise<PersonaEntityOu>;
    abstract filterAll(filterPersonaDto:FilterPersonaDto):Promise<PersonaEntityOu>;
    // abstract updateQR(id:string):Promise<PersonaEntityOu|null>;

    abstract updateById(id:string,updatePersonaDto:UpdatePersonaDto, by:string): Promise<PersonaEntityOu>;

}