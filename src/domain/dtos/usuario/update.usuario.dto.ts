export class UpdateUsuarioDto {
    private constructor (
        public authenticated: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateUsuarioDto?]{
        const { authenticated } = object;
        if(typeof authenticated!=='boolean') return ["Missing authenticated"];
        return [
            undefined,
            new UpdateUsuarioDto(authenticated),
        ]
    }
}