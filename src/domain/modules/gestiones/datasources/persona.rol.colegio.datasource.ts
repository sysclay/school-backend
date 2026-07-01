import { RegisterPersonaRolColegioDto } from "../dtos/register.persona.rol.colegio.dto.js";
import { UpdatePersonaRolColegioDto } from "../dtos/update.persona.rol.colegio.dto copy.js";
import { PersonaRolColegioEntityOu } from "../entities/ou/persona.rol.colegio.entity.js";

export abstract class PersonaRolColegioDatasource {

    abstract register(registerPersonaRolColegioDto:RegisterPersonaRolColegioDto,by:string): Promise<PersonaRolColegioEntityOu>;
    // abstract findById(id:string):Promise<PersonaRolEntityOu>;
    abstract findAll(): Promise<PersonaRolColegioEntityOu>;
    
    abstract updateAll(updatePersonaRolColegioDto:UpdatePersonaRolColegioDto, by:string): Promise<PersonaRolColegioEntityOu>;

}