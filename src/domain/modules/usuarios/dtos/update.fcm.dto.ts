export class UpdateFcmDto {
    private constructor (
        public id_usuario: string,
        public device_id: string,
        public token_fcm?: string,
        public active?: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateFcmDto?]{
        const { id_usuario, device_id, token_fcm,active} = object;
        if(!id_usuario) return ["Missing usuario"];
        if(!device_id) return ["Missing device"];
        // if(!token_fcm) return ["Missing token"];
        return [
            undefined,
            new UpdateFcmDto( id_usuario,device_id, token_fcm,active),
        ]
    }
}