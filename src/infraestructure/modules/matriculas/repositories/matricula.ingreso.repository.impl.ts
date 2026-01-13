
import { MatriculaIngresoDatasource, MatriculaIngresoEntityOu, MatriculaIngresoRepository, MatriculaIngresoEntity } from "../../../../domain/index.js";

export class MatriculaIngresoRepositoryImpl implements MatriculaIngresoRepository {

    constructor(
        private readonly MatriculaIngresoDatasource: MatriculaIngresoDatasource,
    ){}

    // register(registerMatriculaIngresoDto: RegisterMatriculaIngresoDto, by:string): Promise<MatriculaIngresoEntityOu> {
    //     return this.MatriculaIngresoDatasource.register(registerMatriculaIngresoDto,by);
    // } 

    findById(id:string):Promise<MatriculaIngresoEntityOu>{
       return this.MatriculaIngresoDatasource.findById(id);
    }

    async findAll(): Promise<MatriculaIngresoEntityOu> {
        return this.MatriculaIngresoDatasource.findAll();
    }

    async findAllActive(): Promise<MatriculaIngresoEntityOu> {
        return this.MatriculaIngresoDatasource.findAllActive();
    }

}