import { FilterMatriculaDto, MatriculaDatasource, MatriculaEntityOu, MatriculaRepository, RegisterMatriculaDto} from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class MatriculaRepositoryImpl implements MatriculaRepository {

    constructor(
        private readonly matriculaDatasource: MatriculaDatasource,
    ){}

    register(registerMatriculaDto: RegisterMatriculaDto,by:string): Promise<MatriculaEntityOu> {
        return this.matriculaDatasource.register(registerMatriculaDto,by);
    } 

    // findById(id:string):Promise<MatriculaEntityOu|null>{
    //     return this.matriculaDatasource.findById(id);
    // }

    findAll(page:number, limit:number,):Promise<MatriculaEntityOu>{
        return this.matriculaDatasource.findAll(page, limit);
    }

    filter(filterMatriculaDto: FilterMatriculaDto,page:number, limit:number,): Promise<MatriculaEntityOu> {
        return this.matriculaDatasource.filter(filterMatriculaDto,page, limit);
    }


}