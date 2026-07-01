
import { FilterApoderadoAlumnoDto } from "../dtos/filter.apoderado.alumno.dto.js";
import { RegisterApoderadoAlumnoDto } from "../dtos/register.apoderado.alumno.dto.js";
import { ApoderadoAlumnoEntityOu } from "../entities/ou/apoderado.alumno.entity.js";

export abstract class ApoderadoAlumnoDatasource {

    abstract register(registerApoderadoAlumnoDto:RegisterApoderadoAlumnoDto, by:string): Promise<ApoderadoAlumnoEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<ApoderadoAlumnoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ApoderadoAlumnoEntityOu|null>;
    // abstract findAll():Promise<ApoderadoAlumnoEntityOu>;
    abstract findAllApoderado(id_apoderado:string):Promise<ApoderadoAlumnoEntityOu>;
    abstract filterAll(filterApoderadoAlumnoDto:FilterApoderadoAlumnoDto):Promise<ApoderadoAlumnoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;
}