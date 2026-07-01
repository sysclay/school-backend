// import { RegisterMatriculaIngresoDto } from "../dtos/register.MatriculaIngreso.dto.js";
import { MatriculaIngresoEntityOu } from "../entities/ou/matricula.ingreso.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class MatriculaIngresoDatasource {

    // abstract register(registerMatriculaIngresoDto:RegisterMatriculaIngresoDto, by:string): Promise<MatriculaIngresoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<MatriculaIngresoEntityOu>;
    // abstract findByNameCorto(nom_corto:string):Promise<MatriculaIngresoEntityOu|null>;
    abstract findAll():Promise<MatriculaIngresoEntityOu>;
    abstract findAllActive():Promise<MatriculaIngresoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}