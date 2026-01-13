import { FilterPorteroDto } from "../dtos/filter.portero.dto.js";
import { RegisterPorteroDto } from "../dtos/register.portero.dto.js";
import { PorteroEntityOu } from "../entities/ou/portero.entity.js";
import { FilterPorteroEntityOu } from "../entities/ou/filter.entity.js";

export abstract class PorteroRepository {

    abstract register(registerPorteroDto:RegisterPorteroDto,by:string): Promise<PorteroEntityOu>;
    abstract findById(id:string):Promise<PorteroEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<PorteroEntityOu|null>;
    abstract findAll():Promise<PorteroEntityOu>;
    abstract findAllColegio(id_colegio:string):Promise<PorteroEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    abstract filterAll(filterPorteroDto:FilterPorteroDto):Promise<PorteroEntityOu>;
}