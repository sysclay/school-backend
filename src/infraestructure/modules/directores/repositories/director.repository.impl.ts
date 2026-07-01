
import { DirectorDatasource, DirectorEntityOu, DirectorRepository, RegisterDirectorDto } from "../../../../domain/index.js";

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

    
    findByIdColegio(id:string):Promise<DirectorEntityOu>{
        return this.DirectorDatasource.findByIdColegio(id);
    }

}