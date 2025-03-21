import { RegisterDocenteDto } from "../dtos/docente/register.docente.dto.js";
import { DocenteEntityOu } from "../entities/ou/docente.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class DocenteDatasource {

    abstract register(registerDocenteDto:RegisterDocenteDto): Promise<DocenteEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<DocenteEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<DocenteEntityOu|null>;
    abstract findAll():Promise<DocenteEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}