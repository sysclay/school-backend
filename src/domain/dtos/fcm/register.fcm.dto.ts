export class RegisterFcmDto {
    private constructor (
        public token_fcm: string,
        public apoderado_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterFcmDto?]{
        const { token_fcm, apoderado_id} = object;
        if(!token_fcm) return ["Missing token"];
        if(!apoderado_id) return ["Missing apoderado"];
        return [
            undefined,
            new RegisterFcmDto( token_fcm, apoderado_id),
        ]
    }
}