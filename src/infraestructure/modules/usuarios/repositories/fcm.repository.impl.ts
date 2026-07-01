import {  FcmDatasource, FcmEntityOu, FcmRepository, FilterFcmDto, RegisterFcmDto, UpdateFcmDto} from "../../../../domain/index.js";
// import { RegisterTipoFcmDto } from "../../domain/dtos/tipofcm/register.fcm.dto";

export class FcmRepositoryImpl implements FcmRepository {

    constructor(
        private readonly fcmDatasource: FcmDatasource,
    ){}

    register(registerFcmDto: RegisterFcmDto,by:string): Promise<FcmEntityOu> {
        return this.fcmDatasource.register(registerFcmDto,by);
    }

    findById(id:string):Promise<FcmEntityOu>{
       return this.fcmDatasource.findById(id);
    }

    findAll():Promise<FcmEntityOu>{
        return this.fcmDatasource.findAll();
    }

    filter(filterFcmDto: FilterFcmDto): Promise<FcmEntityOu> {
        return this.fcmDatasource.filter(filterFcmDto);
    }

    // updateAll(id: string, updateFcmDto: UpdateFcmDto): Promise<FcmEntityOu> {
    //     return this.fcmDatasource.updateAll(id,updateFcmDto);
    // }

    updateOne(id: string, updateFcmDto: UpdateFcmDto,by:string): Promise<FcmEntityOu> {
        return this.fcmDatasource.updateOne(id,updateFcmDto,by);
    }
    updateActive(id: string, updateFcmDto: UpdateFcmDto,by:string): Promise<FcmEntityOu> {
        return this.fcmDatasource.updateActive(id,updateFcmDto,by);
    }

}