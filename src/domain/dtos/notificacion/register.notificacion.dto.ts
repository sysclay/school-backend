export class RegisterNotificacionDto {
    private constructor (
        public token_fcm: string,
        public message: string | null,
        public apoderado_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterNotificacionDto?]{
        const { token_fcm,message, apoderado_id} = object;
        if(!token_fcm) return ["Missing fcm"];
        if(!apoderado_id) return ["Missing apoderado"];
        return [
            undefined,
            new RegisterNotificacionDto(token_fcm,message, apoderado_id),
        ]
    }
}