// import { FilterDirectorDto } from "../dtos/filter.Director.dto.js";
import { FilterDirectorDto } from "../dtos/filter.director.dto.js";
import { RegisterDirectorDto } from "../dtos/register.director.dto.js";
import { DirectorEntityOu } from "../entities/ou/director.entity.js";

export abstract class DirectorRepository {

    abstract register(registerDirectorDto:RegisterDirectorDto,by:string): Promise<DirectorEntityOu>;
    abstract findById(id:string):Promise<DirectorEntityOu>;
    abstract findAll(page:number, limit:number):Promise<DirectorEntityOu>;
    abstract findByIdColegio(id_colegio:string):Promise<DirectorEntityOu>;

    abstract filterAll(filterDirectorDto:FilterDirectorDto):Promise<DirectorEntityOu>;

}