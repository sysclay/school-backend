import { TurnoDatasource, TurnoEntityOu, TurnoRepository, RegisterTurnoDto} from "../../../../domain/index.js";
// import { RegisterTipoRolDto } from "../../domain/dtos/tipoRol/register.Rol.dto";

export class TurnoRepositoryImpl implements TurnoRepository {

    constructor(
        private readonly TurnoDatasource:TurnoDatasource,
    ){}

    // register(registerTurnoDto: RegisterTurnoDto, by: string): Promise<TurnoEntityOu> {
    //     return this.TurnoDatasource.register(registerTurnoDto,by);
    // }

    findAll():Promise<TurnoEntityOu>{
        return this.TurnoDatasource.findAll();
    }

    findAllActive(): Promise<TurnoEntityOu> {
        return this.TurnoDatasource.findAllActive();
    }

    findById(id: string): Promise<TurnoEntityOu> {
        return this.TurnoDatasource.findById(id)
    }



}