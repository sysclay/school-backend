// import { FilterMatriculaEstadoDto } from "../dtos/filter.tipo.ingreso.dto.js";
// import { RegisterMatriculaEstadoDto } from "../dtos/register.tipo.ingreso.dto.js";
// import { UpdateMatriculaEstadoDto } from "../dtos/update.tipo.ingreso.dto.js";
import { MatriculaEstadoEntityOu } from "../entities/ou/matricula.estado.entity.js";

export abstract class MatriculaEstadoRepository {

    // abstract register(registerMatriculaEstadoDto:RegisterMatriculaEstadoDto,by:string): Promise<MatriculaEstadoEntityOu>;
    abstract findAll():Promise<MatriculaEstadoEntityOu>;
    abstract findById(id:string):Promise<MatriculaEstadoEntityOu>;
    abstract findAllActive():Promise<MatriculaEstadoEntityOu>;

}