import { FilterColegioSeccionDto } from "../dtos/filter.colegio.seccion.dto.js";
import { RegisterColegioSeccionDto } from "../dtos/register.colegio.seccion.dto.js";
import { UpdateColegioSeccionDto } from "../dtos/update.colegio.seccion.dto.js";
import { ColegioSeccionEntityOu } from "../entities/ou/colegio.seccion.entity.js";

export abstract class ColegioSeccionRepository {

    abstract register(registerColegioSeccionDto:RegisterColegioSeccionDto,by:string): Promise<ColegioSeccionEntityOu>;

    abstract findByIdColegio(id:string,  estado:boolean):Promise<ColegioSeccionEntityOu>;
    // abstract findByIdAllNivel(id:string):Promise<ColegioSeccionEntityOu>;

    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<ColegioSeccionEntityOu>;
    abstract filter(filterColegioSeccionDto:FilterColegioSeccionDto):Promise<ColegioSeccionEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    abstract updateIsActive(updateColegioSeccionDto:UpdateColegioSeccionDto,by:string): Promise<ColegioSeccionEntityOu>;
}