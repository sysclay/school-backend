import { AsignadoDatasource, AsignadoEntityOu, AsignadoRepository, RegisterAsignadoDto} from "../../../../domain/index.js";
// import { RegisterTipoRolDto } from "../../domain/dtos/tipoRol/register.Rol.dto";

export class AsignadoRepositoryImpl implements AsignadoRepository {

    constructor(
        private readonly AsignadoDatasource:AsignadoDatasource,
    ){}

    register(registerAsignadoDto: RegisterAsignadoDto, by: string): Promise<AsignadoEntityOu> {
        return this.AsignadoDatasource.register(registerAsignadoDto,by);
    }

    findAll():Promise<AsignadoEntityOu>{
        return this.AsignadoDatasource.findAll();
    }

    findById(id: string): Promise<AsignadoEntityOu> {
        return this.AsignadoDatasource.findById(id)
    }



}