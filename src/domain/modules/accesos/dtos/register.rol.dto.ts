export class RegisterRolDto {
    private constructor (
        public codigo: string,
        public nombre: string,
        public descripcion: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterRolDto?]{
        const { codigo, nombre, descripcion } = object;
        if(!codigo) return ["Missing codigo"];
        if(!nombre) return ["Missing nombre"];
        if(!descripcion) return ["Missing descripcion"];
        // Validar que los valores sean números enteros
        // const parsedRolId = Number(rol_id);
        // const parsedUsuarioId = Number(usuario_id);
        // if (!Number.isInteger(parsedRolId)) return ["rol debe ser valido"];
        // if (!Number.isInteger(parsedUsuarioId)) return ["usuario debe ser valido"];

        return [
            undefined,
            new RegisterRolDto( codigo, nombre, descripcion),
        ]
    }
}