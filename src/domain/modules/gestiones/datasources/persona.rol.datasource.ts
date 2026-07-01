import { RegisterPersonaRolDto  } from "../dtos/register.persona.rol.dto.js";
import { PersonaRolEntityOu } from "../entities/ou/persona.rol.entity.js";

export abstract class PersonaRolDatasource {

    abstract register(registerPersonaRolDto:RegisterPersonaRolDto,by:string): Promise<PersonaRolEntityOu>;
    // abstract findById(id:string):Promise<PersonaRolEntityOu>;
    abstract findAll(): Promise<PersonaRolEntityOu>;
    
    // abstract updateAll(updateColegioDto:UpdateColegioDto, by:string): Promise<ColegioEntityOu>;

}