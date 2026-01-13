import { RegisterPersonaRolDto } from "../dtos/register.persona.rol.dto.js";
import { PersonaRolEntityOu } from "../entities/ou/persona.rol.entity.js";

export abstract class PersonaRolRepository {

    abstract register(registerPersonaRolDto:RegisterPersonaRolDto,by:string): Promise<PersonaRolEntityOu>;

    // abstract findById(id:string):Promise<PersonaRolEntityOu>;
    // abstract findByIdAllNivel(id:string):Promise<PersonaRolEntityOu>;

    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll(page:number, limit:number, role: string, search: string):Promise<PersonaRolEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    // abstract updateIsActive(updatePersonaRolDto:UpdatePersonaRolDto,by:string): Promise<PersonaRolEntityOu>;
}