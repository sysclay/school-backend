import { RegisterFcmDto } from "../dtos/fcm/register.fcm.dto.js";
import { FcmEntityOu } from "../entities/ou/fcm.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class FcmDatasource {

    abstract register(registerFcmDto:RegisterFcmDto): Promise<FcmEntityOu>;
    // abstract register(): Promise<any>;
    //abstract findById(id:string):Promise<FcmEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<FcmEntityOu|null>;
    abstract findAll():Promise<FcmEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}