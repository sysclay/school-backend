export class FilterRolDto {
    private constructor (
        public usuario_id: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterRolDto?]{
        const { usuario_id} = object;
        if(!usuario_id) return ["Missing usuario"];
        const parsedUsuarioId = Number(usuario_id);
        if (!Number.isInteger(parsedUsuarioId)) return ["usuario debe ser valido"];

        return [
            undefined,
            new FilterRolDto( usuario_id),
        ]
    }
}