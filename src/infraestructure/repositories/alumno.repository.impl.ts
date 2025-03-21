import {  AlumnoDatasource, AlumnoEntityOu, AlumnoRepository, RegisterAlumnoDto} from "../../domain/index.js";
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

    updateQR(id:string):Promise<AlumnoEntityOu|null>{
        return this.alumnoDatasource.updateQR(id);
    }

}