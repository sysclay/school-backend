export class RegisterFcmDto {
    private constructor (
        public usuario_id: string,
        public token_fcm: string,
        public device_id: string,
        public authenticated:boolean,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterFcmDto?]{
        const { usuario_id, token_fcm, device_id,authenticated} = object;
        if(!usuario_id) return ["Missing usuario"];
        if(!token_fcm) return ["Missing token"];
        if(!device_id) return ["Missing device"];
        if(typeof authenticated!=='boolean') return ["Missing authenticated"];
        return [
            undefined,
            new RegisterFcmDto( usuario_id, token_fcm,device_id,authenticated),
        ]
    }
}