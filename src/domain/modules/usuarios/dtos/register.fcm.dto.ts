export class RegisterFcmDto {
    private constructor (
        public id_usuario: string,
        public token_fcm: string,
        public device_id: string,
        public platform: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterFcmDto?]{
        const { id_usuario, token_fcm, device_id, platform } = object;
        if(!id_usuario) return ["Missing usuario"];
        if(!token_fcm) return ["Missing token"];
        if(!device_id) return ["Missing device"];
        if(!platform) return ["Missing platform"];
        return [
            undefined,
            new RegisterFcmDto( id_usuario, token_fcm,device_id, platform),
        ]
    }
}