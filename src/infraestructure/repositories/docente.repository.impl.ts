import {  DocenteDatasource, DocenteEntityOu, DocenteRepository, RegisterDocenteDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class DocenteRepositoryImpl implements DocenteRepository {

    constructor(
        private readonly DocenteDatasource: DocenteDatasource,
    ){}

    register(registerDocenteDto: RegisterDocenteDto): Promise<DocenteEntityOu> {
        return this.DocenteDatasource.register(registerDocenteDto);
    } 

    findById(id:string):Promise<DocenteEntityOu>{
        return this.DocenteDatasource.findById(id);
    }

    findAll():Promise<DocenteEntityOu>{
        return this.DocenteDatasource.findAll();
    }

}