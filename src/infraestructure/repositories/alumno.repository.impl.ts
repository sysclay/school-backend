import {  AlumnoDatasource, AlumnoEntityOu, AlumnoRepository, FilterAlumnoDto, RegisterAlumnoDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class AlumnoRepositoryImpl implements AlumnoRepository {

    constructor(
        private readonly alumnoDatasource: AlumnoDatasource,
    ){}

    register(registerAlumnoDto: RegisterAlumnoDto): Promise<AlumnoEntityOu> {
        return this.alumnoDatasource.register(registerAlumnoDto);
    } 

    findById(id:string):Promise<AlumnoEntityOu|null>{
        return this.alumnoDatasource.findById(id);
    }

    findAll():Promise<AlumnoEntityOu|null>{
        return this.alumnoDatasource.findAll();
    }

    filterAll(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>{
        return this.alumnoDatasource.filterAll(filterAlumnoDto);
    }

    updateQR(id:string):Promise<AlumnoEntityOu|null>{
        return this.alumnoDatasource.updateQR(id);
    }

}