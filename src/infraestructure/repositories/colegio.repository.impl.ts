import {  ColegioDatasource, ColegioEntityOu, ColegioRepository, RegisterColegioDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class ColegioRepositoryImpl implements ColegioRepository {

    constructor(
        private readonly colegioDatasource: ColegioDatasource,
    ){}

    register(registerColegioDto: RegisterColegioDto): Promise<ColegioEntityOu> {
        return this.colegioDatasource.register(registerColegioDto);
    } 

    //findById(id:string):Promise<ColegioEntityOu|null>{
    //    return this.ColegioDatasource.findById(id);
    //}
//
    findAll():Promise<ColegioEntityOu>{
        return this.colegioDatasource.findAll();
    }

}