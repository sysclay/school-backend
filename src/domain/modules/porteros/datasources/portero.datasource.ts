import { FilterPorteroDto } from "../dtos/filter.portero.dto.js";
import { RegisterPorteroDto } from "../dtos/register.portero.dto.js";
import { PorteroEntityOu } from "../entities/ou/portero.entity.js";
import { FilterPorteroEntityOu } from "../entities/ou/filter.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class PorteroDatasource {

    abstract register(registerPorteroDto:RegisterPorteroDto, by:string): Promise<PorteroEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<PorteroEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<PorteroEntityOu|null>;
    abstract findAll():Promise<PorteroEntityOu>;
    abstract findAllColegio(id_colegio:string):Promise<PorteroEntityOu>;
    abstract filterAll(filterPorteroDto:FilterPorteroDto):Promise<PorteroEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}