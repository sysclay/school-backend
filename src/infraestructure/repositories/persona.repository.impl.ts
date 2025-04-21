import {  PersonaDatasource, PersonaEntityOu, PersonaRepository, FilterPersonaDto, RegisterPersonaDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class PersonaRepositoryImpl implements PersonaRepository {

    constructor(
        private readonly personaDatasource: PersonaDatasource,
    ){}

    register(registerPersonaDto: RegisterPersonaDto): Promise<PersonaEntityOu> {
        return this.personaDatasource.register(registerPersonaDto);
    } 

    // findById(id:string):Promise<PersonaEntityOu|null>{
    //     return this.PersonaDatasource.findById(id);
    // }

    // findAll():Promise<PersonaEntityOu|null>{
    //     return this.PersonaDatasource.findAll();
    // }

    // filterAll(filterPersonaDto:FilterPersonaDto):Promise<PersonaEntityOu>{
    //     return this.PersonaDatasource.filterAll(filterPersonaDto);
    // }

    // updateQR(id:string):Promise<PersonaEntityOu|null>{
    //     return this.PersonaDatasource.updateQR(id);
    // }

}