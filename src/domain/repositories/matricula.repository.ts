import { RegisterMatriculaDto } from "../dtos/matricula/register.matricula.dto.js";
import { FilterMatriculaEntityOu } from "../entities/ou/matricula/filter.entity.js";
import { MatriculaEntityOu } from "../entities/ou/matricula/matricula.entity.js";

export abstract class MatriculaRepository {

    abstract register(registerMatriculaDto:RegisterMatriculaDto): Promise<MatriculaEntityOu>;
    abstract findById(id:string):Promise<MatriculaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<MatriculaEntityOu|null>;
    abstract findAll():Promise<MatriculaEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    abstract filterMatriculaGradoSeccion(id:string): Promise<FilterMatriculaEntityOu>;
}