
import { RegisterParentescoDto } from "../dtos/register.parentesco.dto.js";
import { ParentescoEntityOu } from "../entities/ou/parentesco.entity.js";

export abstract class ParentescoRepository {

    abstract register(registerParentescoDto:RegisterParentescoDto,by:string): Promise<ParentescoEntityOu>;
    // abstract findById(id:string):Promise<ParentescoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ParentescoEntityOu|null>;
    abstract findAll():Promise<ParentescoEntityOu>;
    abstract findAllActive():Promise<ParentescoEntityOu>;
    // abstract findAllColegio(id_colegio:string):Promise<ParentescoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    // abstract filterAll(filterParentescoDto:FilterParentescoDto):Promise<ParentescoEntityOu>;
}