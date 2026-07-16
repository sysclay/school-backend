
import { DirectorDatasource, DirectorEntityOu, DirectorRepository, FilterDirectorDto, RegisterDirectorDto } from "../../../../domain/index.js";

export class DirectorRepositoryImpl implements DirectorRepository {

    constructor(
        private readonly DirectorDatasource: DirectorDatasource,
    ){}

    register(registerDirectorDto: RegisterDirectorDto, by:string): Promise<DirectorEntityOu> {
        return this.DirectorDatasource.register(registerDirectorDto,by);
    } 

    findById(id:string):Promise<DirectorEntityOu>{
       return this.DirectorDatasource.findById(id);
    }

    findAll(page:number, limit:number):Promise<DirectorEntityOu>{
        return this.DirectorDatasource.findAll();
    }

    
    findByIdColegio(id_colegio:string):Promise<DirectorEntityOu>{
        return this.DirectorDatasource.findByIdColegio(id_colegio);
    }

    filterAll(filterDirectorDto:FilterDirectorDto):Promise<DirectorEntityOu>{
        return this.DirectorDatasource.filterAll(filterDirectorDto);
    }
}