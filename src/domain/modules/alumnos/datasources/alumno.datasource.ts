import { FilterAlumnoDto } from "../dtos/filter.alumno.dto.js";
import { RegisterAlumnoDto } from "../dtos/register.alumno.dto.js";
import { AlumnoEntityOu } from "../entities/ou/alumno.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AlumnoDatasource {

    abstract register(registerAlumnoDto:RegisterAlumnoDto, by:string): Promise<AlumnoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<AlumnoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<AlumnoEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<AlumnoEntityOu>;
    abstract findAllColegio(id_colegio:string):Promise<AlumnoEntityOu>;
    abstract filter(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>;
    // abstract updateQR(id:string):Promise<AlumnoEntityOu>;

    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}