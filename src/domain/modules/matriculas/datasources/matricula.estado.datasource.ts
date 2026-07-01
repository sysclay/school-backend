// import { RegisterMatriculaEstadoDto } from "../dtos/register.MatriculaEstado.dto.js";
import { MatriculaEstadoEntityOu } from "../entities/ou/matricula.estado.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class MatriculaEstadoDatasource {

    // abstract register(registerMatriculaEstadoDto:RegisterMatriculaEstadoDto, by:string): Promise<MatriculaEstadoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<MatriculaEstadoEntityOu>;
    // abstract findByNameCorto(nom_corto:string):Promise<MatriculaEstadoEntityOu|null>;
    abstract findAll():Promise<MatriculaEstadoEntityOu>;
    abstract findAllActive():Promise<MatriculaEstadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}