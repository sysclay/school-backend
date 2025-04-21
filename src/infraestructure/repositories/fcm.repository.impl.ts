import {  FcmDatasource, FcmEntityOu, FcmRepository, FilterFcmDto, RegisterFcmDto, UpdateFcmDto} from "../../domain/index.js";
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

    filterAll(filterFcmDto: FilterFcmDto): Promise<FcmEntityOu> {
        return this.fcmDatasource.filterAll(filterFcmDto);
    }

    updateAll(id: string, updateFcmDto: UpdateFcmDto): Promise<FcmEntityOu> {
        return this.fcmDatasource.updateAll(id,updateFcmDto);
    }

}