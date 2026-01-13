
import { FilterColegioGradoDto } from "../dtos/filter.colegio.grado.dto.js";
import { RegisterColegioGradoDto } from "../dtos/register.colegio.grado.dto.js";
import { UpdateColegioGradoDto } from "../dtos/update.colegio.grado.dto.js";
import { ColegioGradoEntityOu } from "../entities/ou/colegio.grado.entity.js";
export abstract class ColegioGradoDatasource {

    abstract register(registerColegioGradoDto:RegisterColegioGradoDto, by:string): Promise<ColegioGradoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findByIdColegio(id:string):Promise<ColegioGradoEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<ColegioGradoEntityOu>;
    abstract filter(filterColegioGradoDto:FilterColegioGradoDto):Promise<ColegioGradoEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;
    abstract updateIsActive(updateColegioGradoDto:UpdateColegioGradoDto, by:string): Promise<ColegioGradoEntityOu>;


}