import { FilterMatriculaDto } from "../dtos/filter.matricula.dto.js";
import { RegisterMatriculaDto } from "../dtos/register.matricula.dto.js";
import { MatriculaEntityOu } from "../entities/ou/matricula.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class MatriculaDatasource {

    abstract register(registerMatriculaDto:RegisterMatriculaDto,by:string): Promise<MatriculaEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<MatriculaEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<MatriculaEntityOu|null>;
    abstract findAll(page:number, limit:number,):Promise<MatriculaEntityOu>;
    // abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;
    abstract filter(filterMatriculaDto:FilterMatriculaDto,page:number, limit:number,): Promise<MatriculaEntityOu>;

}