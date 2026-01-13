import { TurnoColegioDatasource, TurnoColegioEntityOu, TurnoColegioRepository, RegisterTurnoColegioDto} from "../../../../domain/index.js";
// import { RegisterTipoRolDto } from "../../domain/dtos/tipoRol/register.Rol.dto";

export class TurnoColegioRepositoryImpl implements TurnoColegioRepository {

    constructor(
        private readonly TurnoColegioaDatasource:TurnoColegioDatasource,
    ){}

    register(registerTurnoColegioDto: RegisterTurnoColegioDto, by: string): Promise<TurnoColegioEntityOu> {
        return this.TurnoColegioaDatasource.register(registerTurnoColegioDto,by);
    }

    findAll():Promise<TurnoColegioEntityOu>{
        return this.TurnoColegioaDatasource.findAll();
    }

    findAllActive(): Promise<TurnoColegioEntityOu> {
        return this.TurnoColegioaDatasource.findAllActive();
    }

    findById(id: string): Promise<TurnoColegioEntityOu> {
        return this.TurnoColegioaDatasource.findById(id)
    }

    findColegio(id:string,activo:boolean):Promise<TurnoColegioEntityOu>{
        return this.TurnoColegioaDatasource.findColegio(id,activo)
    }

    update(id: string, activo: boolean, by: string): Promise<TurnoColegioEntityOu> {
        return this.TurnoColegioaDatasource.update(id,activo,by)
    }



}