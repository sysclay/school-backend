import { FilterColegioNivelDto } from "../dtos/filter.colegio.nivel.dto.js";
import { RegisterColegioNivelDto } from "../dtos/register.colegio.nivel.dto.js";
import { UpdateColegioNivelDto } from "../dtos/update.colegio.nivel.dto.js";
import { ColegioNivelEntityOu } from "../entities/ou/colegio.nivel.entity.js";

export abstract class ColegioNivelRepository {

    abstract register(registerColegioNivelDto:RegisterColegioNivelDto,by:string): Promise<ColegioNivelEntityOu>;

    abstract findByIdColegio(id:string):Promise<ColegioNivelEntityOu>;
    // abstract findByIdAllNivel(id:string):Promise<ColegioNivelEntityOu>;

    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<ColegioNivelEntityOu>;
    abstract filter(filterColegioNivelDto:FilterColegioNivelDto):Promise<ColegioNivelEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    abstract updateIsActive(updateColegioNivelDto:UpdateColegioNivelDto,by:string): Promise<ColegioNivelEntityOu>;
}