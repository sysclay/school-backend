import { FilterApoderadoAlumnoDto } from "../dtos/apoderado/filter.apoderado.dto.js";
import { RegisterApoderadoDto } from "../dtos/apoderado/register.apoderado.dto.js";
import { ApoderadoEntityOu } from "../entities/ou/apoderado/apoderado.entity.js";
import { FilterApoderadoEntityOu } from "../entities/ou/apoderado/filter.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class ApoderadoDatasource {

    abstract register(registerApoderadoDto:RegisterApoderadoDto): Promise<ApoderadoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<ApoderadoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ApoderadoEntityOu|null>;
    abstract findAll():Promise<ApoderadoEntityOu>;
    abstract filterApoderadoAlumno(filterApoderadoAlumnoDto:FilterApoderadoAlumnoDto):Promise<FilterApoderadoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}