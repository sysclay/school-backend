import {  FcmDatasource, FcmEntityOu, FcmRepository, RegisterFcmDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class FcmRepositoryImpl implements FcmRepository {

    constructor(
        private readonly fcmDatasource: FcmDatasource,
    ){}

    register(registerFcmDto: RegisterFcmDto): Promise<FcmEntityOu> {
        return this.fcmDatasource.register(registerFcmDto);
    } 

    //findById(id:string):Promise<FcmEntityOu|null>{
    //    return this.FcmDatasource.findById(id);
    //}
//
    findAll():Promise<FcmEntityOu>{
        return this.fcmDatasource.findAll();
    }

}