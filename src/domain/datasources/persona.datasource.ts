import { FilterPersonaDto } from "../dtos/persona/filter.persona.dto.js";
import { RegisterPersonaDto } from "../dtos/persona/register.persona.dto.js";
import { PersonaEntityOu } from "../entities/ou/persona.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class PersonaDatasource {

    abstract register(registerPersonaDto:RegisterPersonaDto): Promise<PersonaEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<PersonaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<PersonaEntityOu|null>;
    // abstract findAll():Promise<PersonaEntityOu|null>;
    // abstract filterAll(filterPersonaDto:FilterPersonaDto):Promise<PersonaEntityOu>;
    // abstract updateQR(id:string):Promise<PersonaEntityOu|null>;

    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}