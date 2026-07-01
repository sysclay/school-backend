import { FilterFcmDto } from "../dtos/filter.fcm.dto.js";
import { RegisterFcmDto } from "../dtos/register.fcm.dto.js";
import { UpdateFcmDto } from "../dtos/update.fcm.dto.js";
// import { UpdateFcmDto } from "../dtos/update.fcm.dto.js";
import { FcmEntityOu } from "../entities/ou/fcm.entity.js";

export abstract class FcmRepository {

    abstract register(registerFcmDto:RegisterFcmDto,by:string): Promise<FcmEntityOu>;
    //abstract findByNameCorto(nom_corto:string):Promise<FcmEntityOu|null>;
    abstract findById(id:string):Promise<FcmEntityOu>;
    abstract findAll():Promise<FcmEntityOu>;
    abstract filter(filterFcmDto:FilterFcmDto):Promise<FcmEntityOu>;
    // abstract updateAll(id:string,updateFcmDto:UpdateFcmDto): Promise<FcmEntityOu>;
    abstract updateOne(id:string,updateFcmDto:UpdateFcmDto,by:string): Promise<FcmEntityOu>;
    abstract updateActive(id:string,updateFcmDto:UpdateFcmDto,by:string): Promise<FcmEntityOu>;
}