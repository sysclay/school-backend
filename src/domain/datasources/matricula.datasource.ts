import { RegisterMatriculaDto } from "../dtos/matricula/register.matricula.dto.js";
import { FilterMatriculaEntityOu } from "../entities/ou/matricula/filter.entity.js";
import { MatriculaEntityOu } from "../entities/ou/matricula/matricula.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class MatriculaDatasource {

    abstract register(registerMatriculaDto:RegisterMatriculaDto): Promise<MatriculaEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<MatriculaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<MatriculaEntityOu|null>;
    abstract findAll():Promise<MatriculaEntityOu|null>;
    // abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;
    abstract filterMatriculaGradoSeccion(id:string): Promise<FilterMatriculaEntityOu>;

}