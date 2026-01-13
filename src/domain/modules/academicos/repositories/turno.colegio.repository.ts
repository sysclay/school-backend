import { RegisterTurnoColegioDto } from "../dtos/register.turno.colegio.dto.js";
import { TurnoColegioEntityOu } from "../entities/ou/turno.colegio.entity.js";

export abstract class TurnoColegioRepository {

    abstract register(registerTurnoColegioDto:RegisterTurnoColegioDto, by:string): Promise<TurnoColegioEntityOu>;
    abstract findById(id:string):Promise<TurnoColegioEntityOu>;
    abstract findAll():Promise<TurnoColegioEntityOu>;
    abstract findAllActive():Promise<TurnoColegioEntityOu>;

    abstract findColegio(id:string,activo:boolean):Promise<TurnoColegioEntityOu>;

    abstract update(id:string,activo:boolean,by:string):Promise<TurnoColegioEntityOu>;
}