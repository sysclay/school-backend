import {  PersonaDatasource, PersonaEntityOu, PersonaRepository, FilterPersonaDto, RegisterPersonaDto, UpdatePersonaDto} from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class PersonaRepositoryImpl implements PersonaRepository {

    constructor(
        private readonly personaDatasource: PersonaDatasource,
    ){}

    register(registerPersonaDto: RegisterPersonaDto, by:string): Promise<PersonaEntityOu> {
        return this.personaDatasource.register(registerPersonaDto,by);
    } 

    findById(id:string):Promise<PersonaEntityOu>{
        return this.personaDatasource.findById(id);
    }

    findByIdPerfil(id: string): Promise<PersonaEntityOu> {
        return this.personaDatasource.findByIdPerfil(id);
    }

    findByNDoc(ndoc:string): Promise<PersonaEntityOu> {
        return this.personaDatasource.findByNDoc(ndoc);
    }

    findAll(page:number, limit:number):Promise<PersonaEntityOu>{
        return this.personaDatasource.findAll(page,limit);
    }

    filterAll(filterPersonaDto:FilterPersonaDto):Promise<PersonaEntityOu>{
        return this.personaDatasource.filterAll(filterPersonaDto);
    }

    updateById(id:string,updatePersonaDto: UpdatePersonaDto,by:string):Promise<PersonaEntityOu>{
        return this.personaDatasource.updateById(id,updatePersonaDto,by);
    }

}