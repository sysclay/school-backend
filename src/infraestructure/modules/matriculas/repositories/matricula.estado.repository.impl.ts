
import { MatriculaEstadoDatasource, MatriculaEstadoEntityOu, MatriculaEstadoRepository  } from "../../../../domain/index.js";

export class MatriculaEstadoRepositoryImpl implements MatriculaEstadoRepository {

    constructor(
        private readonly MatriculaEstadoDatasource: MatriculaEstadoDatasource,
    ){}

    // register(registerMatriculaEstadoDto: RegisterMatriculaEstadoDto, by:string): Promise<MatriculaEstadoEntityOu> {
    //     return this.MatriculaEstadoDatasource.register(registerMatriculaEstadoDto,by);
    // } 

    findById(id:string):Promise<MatriculaEstadoEntityOu>{
       return this.MatriculaEstadoDatasource.findById(id);
    }

    async findAll(): Promise<MatriculaEstadoEntityOu> {
        return this.MatriculaEstadoDatasource.findAll();
    }

    async findAllActive(): Promise<MatriculaEstadoEntityOu> {
        return this.MatriculaEstadoDatasource.findAllActive();
    }

}