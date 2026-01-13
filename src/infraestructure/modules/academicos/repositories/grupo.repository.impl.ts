import { GrupoDatasource, GrupoEntityOu, GrupoRepository, RegisterGrupoDto} from "../../../../domain/index.js";
// import { RegisterTipoRolDto } from "../../domain/dtos/tipoRol/register.Rol.dto";

export class GrupoRepositoryImpl implements GrupoRepository {

    constructor(
        private readonly GrupoDatasource:GrupoDatasource,
    ){}

    register(registerGrupoDto: RegisterGrupoDto, by: string): Promise<GrupoEntityOu> {
        return this.GrupoDatasource.register(registerGrupoDto,by);
    }

    findAll():Promise<GrupoEntityOu>{
        return this.GrupoDatasource.findAll();
    }

    findAllActive(): Promise<GrupoEntityOu> {
        return this.GrupoDatasource.findAllActive();
    }

    findById(id: string): Promise<GrupoEntityOu> {
        return this.GrupoDatasource.findById(id)
    }



}