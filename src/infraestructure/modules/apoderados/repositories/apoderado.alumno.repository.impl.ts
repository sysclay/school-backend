import { ApoderadoAlumnoDatasource, ApoderadoAlumnoEntityOu, ApoderadoAlumnoRepository, FilterApoderadoAlumnoDto, RegisterApoderadoAlumnoDto } from "../../../../domain/index.js";
// import { UpdateApoderadoAlumnoDto } from "../../../../domain/modules/apoderadoalumnos/dtos/update.ApoderadoAlumno.dto.js";

export class ApoderadoAlumnoRepositoryImpl implements ApoderadoAlumnoRepository {

    constructor(
        private readonly ApoderadoAlumnoDatasource: ApoderadoAlumnoDatasource,
    ){}

    register(registerApoderadoAlumnoDto: RegisterApoderadoAlumnoDto, by:string): Promise<ApoderadoAlumnoEntityOu> {
        return this.ApoderadoAlumnoDatasource.register(registerApoderadoAlumnoDto,by);
    }

    findAllApoderado(id_apoderado:string):Promise<ApoderadoAlumnoEntityOu>{
        return this.ApoderadoAlumnoDatasource.findAllApoderado(id_apoderado);
    }

    filterAll(filterApoderadoAlumnoDto:FilterApoderadoAlumnoDto):Promise<ApoderadoAlumnoEntityOu>{
        return this.ApoderadoAlumnoDatasource.filterAll(filterApoderadoAlumnoDto);
    }

}