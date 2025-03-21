export class RegisterUsuariorolDto {
    private constructor (
        public rol_id: string,
        public usuario_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterUsuariorolDto?]{
        const { rol_id, usuario_id} = object;
        if(!rol_id) return ["Missing rol"];
        if(!usuario_id) return ["Missing usuario"];
        // Validar que los valores sean números enteros
        const parsedRolId = Number(rol_id);
        const parsedUsuarioId = Number(usuario_id);
        if (!Number.isInteger(parsedRolId)) return ["rol debe ser valido"];
        if (!Number.isInteger(parsedUsuarioId)) return ["usuario debe ser valido"];

        return [
            undefined,
            new RegisterUsuariorolDto( rol_id, usuario_id),
        ]
    }
}