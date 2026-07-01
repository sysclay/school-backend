import { FilterMatriculaDto } from "../dtos/filter.matricula.dto.js";
import { RegisterMatriculaDto } from "../dtos/register.matricula.dto.js";
import { MatriculaEntityOu } from "../entities/ou/matricula.entity.js";

export abstract class MatriculaRepository {

    abstract register(registerMatriculaDto:RegisterMatriculaDto,by:string): Promise<MatriculaEntityOu>;
    // abstract findById(id:string):Promise<MatriculaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<MatriculaEntityOu|null>;
    abstract findAll(page:number, limit:number,):Promise<MatriculaEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    // abstract filterMatriculaGradoSeccion(id:string): Promise<FilterMatriculaEntityOu>;
    abstract filter(filterMatriculaDto:FilterMatriculaDto,page:number, limit:number,): Promise<MatriculaEntityOu>;
}