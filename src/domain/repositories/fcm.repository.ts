import { RegisterFcmDto } from "../dtos/fcm/register.fcm.dto.js";
import { FcmEntityOu } from "../entities/ou/fcm.entity.js";

export abstract class FcmRepository {

    abstract register(registerFcmDto:RegisterFcmDto): Promise<FcmEntityOu>;
    //abstract findById(id:string):Promise<FcmEntityOu|null>;
    //abstract findByNameCorto(nom_corto:string):Promise<FcmEntityOu|null>;
    abstract findAll():Promise<FcmEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}