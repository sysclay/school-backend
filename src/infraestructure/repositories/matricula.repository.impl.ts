import {  MatriculaDatasource, MatriculaEntityOu, MatriculaRepository, RegisterMatriculaDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class MatriculaRepositoryImpl implements MatriculaRepository {

    constructor(
        private readonly matriculaDatasource: MatriculaDatasource,
    ){}

    register(registerMatriculaDto: RegisterMatriculaDto): Promise<MatriculaEntityOu> {
        return this.matriculaDatasource.register(registerMatriculaDto);
    } 

    findById(id:string):Promise<MatriculaEntityOu|null>{
        return this.matriculaDatasource.findById(id);
    }

    findAll():Promise<MatriculaEntityOu|null>{
        return this.matriculaDatasource.findAll();
    }

}