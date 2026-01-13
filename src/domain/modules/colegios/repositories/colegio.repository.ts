import { RegisterColegioDto } from "../dtos/register.colegio.dto.js";
import { UpdateColegioDto } from "../dtos/update.colegio.dto.js";
import { ColegioEntityOu } from "../entities/ou/colegio.entity.js";

export abstract class ColegioRepository {

    abstract register(registerColegioDto:RegisterColegioDto,by:string): Promise<ColegioEntityOu>;

    abstract findById(id:string):Promise<ColegioEntityOu>;
    // abstract findByIdAllNivel(id:string):Promise<ColegioNivelEntityOu>;

    //abstract findByNameCorto(nom_corto:string):Promise<ColegioEntityOu|null>;
    abstract findAll(page:number, limit:number):Promise<ColegioEntityOu>;
    abstract findAllActive(page:number, limit:number):Promise<ColegioEntityOu>;
    abstract findOne(id:string):Promise<ColegioEntityOu>;

    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
    abstract updateAll(updateColegioDto:UpdateColegioDto, by:string): Promise<ColegioEntityOu>;
}