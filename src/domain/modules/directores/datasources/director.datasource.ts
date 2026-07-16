
import { FilterDirectorDto } from "../dtos/filter.director.dto.js";
import { RegisterDirectorDto } from "../dtos/register.director.dto.js";
import { DirectorEntityOu } from "../entities/ou/director.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class DirectorDatasource {

    abstract register(registerDirectorDto:RegisterDirectorDto, by:string): Promise<DirectorEntityOu>;
    abstract findById(id:string):Promise<DirectorEntityOu>;
    abstract findAll():Promise<DirectorEntityOu>;
    abstract findByIdColegio(id_colegio:string):Promise<DirectorEntityOu>;

    abstract filterAll(filterDirectorDto:FilterDirectorDto):Promise<DirectorEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}