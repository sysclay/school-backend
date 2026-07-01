
import { RegisterDirectorDto } from "../dtos/register.director.dto.js";
import { DirectorEntityOu } from "../entities/ou/director.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class DirectorDatasource {

    abstract register(registerDirectorDto:RegisterDirectorDto, by:string): Promise<DirectorEntityOu>;
    abstract findById(id:string):Promise<DirectorEntityOu>;
    abstract findAll():Promise<DirectorEntityOu>;
    abstract findByIdColegio(id:string):Promise<DirectorEntityOu>;

}