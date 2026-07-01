// import { FilterMatriculaIngresoDto } from "../dtos/filter.Matricula.ingreso.dto.js";
// import { RegisterMatriculaIngresoDto } from "../dtos/register.Matricula.ingreso.dto.js";
// import { UpdateMatriculaIngresoDto } from "../dtos/update.Matricula.ingreso.dto.js";
import { MatriculaIngresoEntityOu } from "../entities/ou/matricula.ingreso.entity.js";

export abstract class MatriculaIngresoRepository {

    // abstract register(registerMatriculaIngresoDto:RegisterMatriculaIngresoDto,by:string): Promise<MatriculaIngresoEntityOu>;
    abstract findAll():Promise<MatriculaIngresoEntityOu>;
    abstract findById(id:string):Promise<MatriculaIngresoEntityOu>;
    abstract findAllActive():Promise<MatriculaIngresoEntityOu>;

}