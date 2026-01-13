import { RegisterTurnoDto } from "../dtos/register.turno.dto.js";
import { TurnoEntityOu } from "../entities/ou/turno.entity.js";

export abstract class TurnoRepository {

    // abstract register(registerTurnoDto:RegisterTurnoDto): Promise<TurnoEntityOu>;
    abstract findById(id:string):Promise<TurnoEntityOu>;
    abstract findAll():Promise<TurnoEntityOu>;
    abstract findAllActive():Promise<TurnoEntityOu>;
}