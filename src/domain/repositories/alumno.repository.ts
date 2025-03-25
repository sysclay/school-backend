import { FilterAlumnoDto } from "../dtos/alumno/filter.alumno.dto.js";
import { RegisterAlumnoDto } from "../dtos/alumno/register.alumno.dto.js";
import { AlumnoEntityOu } from "../entities/ou/alumno.entity.js";

export abstract class AlumnoRepository {

    abstract register(registerAlumnoDto:RegisterAlumnoDto): Promise<AlumnoEntityOu>;
    abstract findById(id:string):Promise<AlumnoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AlumnoEntityOu|null>;
    abstract findAll():Promise<AlumnoEntityOu|null>;
    abstract filterAll(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>;
    abstract updateQR(id:string):Promise<AlumnoEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}