export class FilterFcmDto {
    private constructor (
        public token_fcm: string,
        public device_id: string,
        public usuario_id: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterFcmDto?]{
        const { token_fcm, device_id,usuario_id} = object;
        if(!token_fcm) return ["Missing token"];
        if(!device_id) return ["Missing device"];
        if(!usuario_id) return ["Missing usuario"];
        return [
            undefined,
            new FilterFcmDto( token_fcm,device_id,usuario_id),
        ]
    }
}