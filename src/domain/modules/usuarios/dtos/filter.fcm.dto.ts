export class FilterFcmDto {
    private constructor (
        public token_fcm: string,
        public device_id: string,
        public id_usuario: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterFcmDto?]{
        const { token_fcm, device_id,id_usuario} = object;
        if(!token_fcm) return ["Missing token"];
        if(!device_id) return ["Missing device"];
        if(!id_usuario) return ["Missing usuario"];
        return [
            undefined,
            new FilterFcmDto( token_fcm,device_id,id_usuario),
        ]
    }
}