import { RegisterAlumnoDto } from "../dtos/alumno/register.alumno.dto.js";
import { AlumnoEntityOu } from "../entities/ou/alumno.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AlumnoDatasource {

    abstract register(registerAlumnoDto:RegisterAlumnoDto): Promise<AlumnoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<AlumnoEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<AlumnoEntityOu|null>;
    abstract findAll():Promise<AlumnoEntityOu|null>;
    abstract updateQR(id:string):Promise<AlumnoEntityOu|null>;

    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}