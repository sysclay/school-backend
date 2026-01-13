import { AlumnoDatasource, AlumnoEntityOu, AlumnoRepository, FilterAlumnoDto, RegisterAlumnoDto } from "../../../../domain/index.js";
// import { UpdateAlumnoDto } from "../../../../domain/modules/alumnos/dtos/update.Alumno.dto.js";

export class AlumnoRepositoryImpl implements AlumnoRepository {

    constructor(
        private readonly AlumnoDatasource: AlumnoDatasource,
    ){}

    register(registerAlumnoDto: RegisterAlumnoDto, by:string): Promise<AlumnoEntityOu> {
        return this.AlumnoDatasource.register(registerAlumnoDto,by);
    }

    findById(id:string):Promise<AlumnoEntityOu>{
       return this.AlumnoDatasource.findById(id);
    }

    findAll(page:number, limit:number):Promise<AlumnoEntityOu>{
        return this.AlumnoDatasource.findAll(page,limit);
    }

    findAllColegio(id_colegio:string):Promise<AlumnoEntityOu>{
        return this.AlumnoDatasource.findAllColegio(id_colegio);
    }

    filter(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>{
        return this.AlumnoDatasource.filter(filterAlumnoDto);
    }

    // updateAll(updateAlumnoDto: UpdateAlumnoDto, by: string): Promise<AlumnoEntityOu> {
    //     return this.AlumnoDatasource.updateAll(updateAlumnoDto,by)
    // }

}