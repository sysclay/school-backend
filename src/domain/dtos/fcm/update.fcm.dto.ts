export class UpdateFcmDto {
    private constructor (
        public usuario_id: string,
        public authenticated: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateFcmDto?]{
        const { usuario_id, authenticated} = object;
        if(!usuario_id) return ["Missing usuario"];
        if(typeof authenticated!=='boolean') return ["Missing authenticated"];
        return [
            undefined,
            new UpdateFcmDto( usuario_id,authenticated),
        ]
    }
}