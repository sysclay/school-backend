import { RegisterDocenteDto } from "../dtos/docente/register.docente.dto.js";
import { DocenteEntityOu } from "../entities/ou/docente.entity.js";

export abstract class DocenteRepository {

    abstract register(registerDocenteDto:RegisterDocenteDto): Promise<DocenteEntityOu>;
    abstract findById(id:string):Promise<DocenteEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<DocenteEntityOu|null>;
    abstract findAll():Promise<DocenteEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}