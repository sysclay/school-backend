
import { RegisterAsignadoDto } from "../dtos/register.asignado.dto.js";
import { AsignadoEntityOu } from "../entities/ou/asignado.entity.js";

export abstract class AsignadoRepository {
    
    abstract register(registerAsignadoDto:RegisterAsignadoDto,by:string): Promise<AsignadoEntityOu>;
    abstract findAll():Promise<AsignadoEntityOu>;
    abstract findById(id:string):Promise<AsignadoEntityOu>;

}